package com.ivantimarket.ivanti;

import com.ivantimarket.ivanti.dto.packages.NewPackageDTO;
import com.ivantimarket.ivanti.dto.user.NewUserDTO;
import com.ivantimarket.ivanti.dto.user.UserDTO;
import com.ivantimarket.ivanti.model.Package;
import com.ivantimarket.ivanti.model.Role;
import com.ivantimarket.ivanti.model.SystemRequirements;
import com.ivantimarket.ivanti.model.User;
import com.ivantimarket.ivanti.model.Version;
import com.ivantimarket.ivanti.service.PackageService;
import com.ivantimarket.ivanti.service.SequenceGeneratorService;
import com.ivantimarket.ivanti.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
public class IvantiApplication {
	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(IvantiApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserService userService, PackageService packageService, SequenceGeneratorService sequenceGeneratorService) {
		return args -> {

			userService.saveRole(new Role(1,"ROLE_CUSTOMER"));
			userService.saveRole(new Role(2,"ROLE_CONTENT_CREATOR"));


			if (userService.getUserDTO("mike") == null) {
				NewUserDTO userDTOMike = new NewUserDTO(-1, "Mike", "mike", "mike12345", "mike@gmail.com", "ROLE_CONTENT_CREATOR");
				userDTOMike.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
				userService.saveUser(userDTOMike);
			}
			//get user
			UserDTO userDTO = userService.getUserDTO("mike");

			SystemRequirements requirements = new SystemRequirements("Intel Core i3", "4GB", "3GB" );
			Version version1 = new Version("1.0.0beta", "information about the version is shown here", "https://something.com/download", LocalDateTime.now(), 200);
			Version version2 = new Version("2.0.0", "information about the version is shown here", "https://something.com/download", LocalDateTime.now(), 200);
			Version version3 = new Version("3.0.0alpha", "information about the version is shown here", "https://something.com/download", LocalDateTime.now(), 200);

			NewPackageDTO newPackage1 = new NewPackageDTO(-1,"Ivanti.Log", 1,"System history synchronization with device");
			NewPackageDTO newPackage2 = new NewPackageDTO(-1,"Ivanti.Location", 1,"Tracking device location");
			NewPackageDTO newPackage3 = new NewPackageDTO(-1,"Ivanti.Devtools", 1,"Some description text to describe the package");
			NewPackageDTO newPackage4 = new NewPackageDTO(-1,"Ivanti.AssetManager", 1,"Some description text to describe the package");
			NewPackageDTO newPackage5 = new NewPackageDTO(-1,"Ivanti.Controls", 1,"Some description text to describe the package");


			newPackage1.setId(sequenceGeneratorService.generateSequence(com.ivantimarket.ivanti.model.Package.SEQUENCE_NAMEE));
			packageService.addNewPackage(newPackage1,version1, requirements);
			packageService.addVersion(newPackage1.getId(), version2);
			packageService.addVersion(newPackage1.getId(), version3);

			newPackage2.setId(sequenceGeneratorService.generateSequence(com.ivantimarket.ivanti.model.Package.SEQUENCE_NAMEE));
			packageService.addNewPackage(newPackage2,version1, requirements);
			packageService.addVersion(newPackage2.getId(), version2);

			newPackage3.setId(sequenceGeneratorService.generateSequence(com.ivantimarket.ivanti.model.Package.SEQUENCE_NAMEE));
			packageService.addNewPackage(newPackage3,version1, requirements);
			packageService.addVersion(newPackage3.getId(), version2);

			newPackage4.setId(sequenceGeneratorService.generateSequence(com.ivantimarket.ivanti.model.Package.SEQUENCE_NAMEE));
			packageService.addNewPackage(newPackage4,version1, requirements);
			packageService.addVersion(newPackage4.getId(), version2);

			newPackage5.setId(sequenceGeneratorService.generateSequence(Package.SEQUENCE_NAMEE));
			packageService.addNewPackage(newPackage5,version1, requirements);
			packageService.addVersion(newPackage5.getId(), version2);

		};
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
