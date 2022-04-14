package com.ivantimarket.ivanti.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ivantimarket.ivanti.dto._mapper.UserMapperImpl;
import com.ivantimarket.ivanti.dto.user.NewUserDTO;
import com.ivantimarket.ivanti.dto.user.UserAuthDTO;
import com.ivantimarket.ivanti.dto.user.UserDTO;
//import com.ivantimarket.ivanti.dto._mapper.UserMapper;
import com.ivantimarket.ivanti.exception.UnsatisfiedPasswordException;
import com.ivantimarket.ivanti.exception.UserAlreadyExistsException;
import com.ivantimarket.ivanti.model.Role;
import com.ivantimarket.ivanti.model.User;
import com.ivantimarket.ivanti.repo.RoleRepository;
import com.ivantimarket.ivanti.repo.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    //    private final UserMapper userMapper;
    private final UserMapperImpl userMapper;


    public User getUser(long id) {
        return userRepo.findById(id);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);

        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public UserDTO getUserDTO(long id){
        return userMapper.toUserDto(userRepo.findById(id));
    }

    public UserDTO saveUser(NewUserDTO userDTO) {
        User existingUsername = userRepo.findByUsername(userDTO.getUsername());
        User existingEmail = userRepo.findByEmail(userDTO.getEmail());
        if (existingUsername != null) {
            throw new UserAlreadyExistsException("Account with this username already exists");
        } else if (existingEmail != null) {
            throw new UserAlreadyExistsException("Account with this email already exists.");
        }

        if (userDTO.getPassword().length() < 8) {
            throw new UnsatisfiedPasswordException("Password must be at least 8 characters");
        }

        User user = userMapper.toUser(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        addRoleToUser(user, userDTO.getRoleName());
        return userMapper.toUserDto(userRepo.save(user));
    }

    public User updateUser(String name, String email, long id) {
        User user1 = userRepo.findById(id);
        if (user1 != null) {
            user1.setEmail(email);
            user1.setName(name);
            return userRepo.save(user1);
        }
        return null;
    }

    public User updatePasswordUser(long id, String oldpassword, String password) {
        User user1 = userRepo.findById(id);
        if (user1 != null) {

            if (passwordEncoder.matches(oldpassword,user1.getPassword())) {
                user1.setPassword(passwordEncoder.encode(password));
                return userRepo.save(user1);
            }
        }
        return null;
    }

    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    private void addRoleToUser(User user, String roleName) {
        log.info("Adding  role {} to user {}", roleName, user.getUsername());
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    public UserDTO getUserDTO(String username) {
        return userMapper.toUserDto(userRepo.findByUsername(username));
    }

    public UserAuthDTO getUserAuthDTO(String username) {
        return userMapper.toUserAuthDTO(userRepo.findByUsername(username));
    }


    public List<UserDTO> getUserDTOs() {
        log.info("Fetching all users");
//        return userMapper.toUserDTOs(userRepo.findAll());
        return null;
    }

    public User getUserByToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userRepo.findByUsername(username);
                return user;
            } catch (Exception ex) {
                log.error("Error finding user in: {}", ex.getMessage());
                response.setHeader("error", ex.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                return null;
            }

        } else {
            throw new RuntimeException("Refresh token is missing");
        }
//        return null;
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userRepo.findByUsername(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new java.sql.Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception ex) {
                log.error("Error logging in: {}", ex.getMessage());
                response.setHeader("error", ex.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

        } else {
            throw new RuntimeException("Refresh token is missing");
        }

    }

}
