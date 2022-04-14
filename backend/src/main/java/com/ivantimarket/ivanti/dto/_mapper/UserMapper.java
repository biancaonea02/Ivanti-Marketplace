package com.ivantimarket.ivanti.dto._mapper;

import com.ivantimarket.ivanti.dto.user.UserAuthDTO;
import com.ivantimarket.ivanti.dto.user.NewUserDTO;
import com.ivantimarket.ivanti.dto.user.UserDTO;
import com.ivantimarket.ivanti.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDto(User user);
    User toUser(NewUserDTO user);
    User toUserDTO(UserDTO user);
    List<UserDTO> toUserDTOs(List<User> users);
    UserAuthDTO toUserAuthDTO(User user);

    //This function has to be commented or uncommented before running the app for the 1st time
//     User fakeMethod(UserDTO user);
}
