package com.ivantimarket.ivanti.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ivantimarket.ivanti.dto.FileData;
import com.ivantimarket.ivanti.dto.packages.NewPackageDTO;
import com.ivantimarket.ivanti.dto.packages.PackageOverviewDTO;
import com.ivantimarket.ivanti.dto.user.NewUserDTO;
import com.ivantimarket.ivanti.dto.user.UserDTO;
import com.ivantimarket.ivanti.model.Package;
import com.ivantimarket.ivanti.model.SystemRequirements;
import com.ivantimarket.ivanti.model.User;
import com.ivantimarket.ivanti.model.Version;
import com.ivantimarket.ivanti.service.FileService;
import com.ivantimarket.ivanti.service.PackageService;
import com.ivantimarket.ivanti.service.SequenceGeneratorService;
import com.ivantimarket.ivanti.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/packages")
public class PackageController {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private final PackageService packageService;
    private final FileService fileService;

    //So we can take UserDTO and assign a package
    private final SequenceGeneratorService sequenceGeneratorService;

    public PackageController(PackageService packageService, SequenceGeneratorService sequenceGeneratorService,
                             UserService userService, FileService fileService) {
        this.packageService = packageService;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.fileService = fileService;

    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<PackageOverviewDTO> getAllPackages() {
        LOG.info("Getting all packages.");
        return packageService.getAllPackages();
    }

    @RequestMapping(value = "/get/{packageId}", method = RequestMethod.GET)
    public Package getPackage(@PathVariable int packageId) {
        LOG.info("Getting package with ID: {}.", packageId);
        return packageService.getPackage(packageId);
    }

//    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public Package addNewPackage(@RequestPart String rawPackage,@RequestPart String rawVersion, @RequestPart MultipartFile file, @RequestPart String rawRequirements) {
//        NewPackageDTO newPackage = getNewPackageDTO(rawPackage);
//        Version version = getVersion(rawVersion);
//        SystemRequirements requirements = getSystemRequirements(rawRequirements);
//
//        newPackage.setId(sequenceGeneratorService.generateSequence(Package.SEQUENCE_NAMEE));
//
//        String fileName = newPackage.getTitle() + "-" + version.getName() + ".zip";
//        FileData fileData =pathToFileData(fileService.save(file, fileName));
//        String url = fileData.getUrl();
//        version.setUrl(url);
//        version.setDateAdded(LocalDateTime.now());
//        version.setSize(fileData.getSize());
//
//        return packageService.addNewPackage(newPackage, version, requirements);
//    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Package addNewPackage(@RequestBody NewPackageDTO rawPackage,@RequestBody Version rawVersion, @RequestBody SystemRequirements rawRequirements) {
        rawPackage.setId(sequenceGeneratorService.generateSequence(Package.SEQUENCE_NAMEE));
        String fileName = rawPackage.getTitle() + "-" + rawVersion.getName() + ".zip";
//        FileData fileData = pathToFileData(fileService.save(file, fileName));
//        String url = fileData.getUrl();
//        rawVersion.setUrl(url);
        rawVersion.setDateAdded(LocalDateTime.now());
//        rawVersion.setSize(fileData.getSize());

        return packageService.addNewPackage(rawPackage, rawVersion, rawRequirements);
    }

//    @PostMapping(value = "/create")
//    public ResponseEntity<Package> createPackage(HttpServletRequest request, HttpServletResponse response,
//                                                 @RequestParam("creatorId") long creatorId,
//                                                 @RequestParam("packageName") String packageName,
//                                                 @RequestParam("intro") String intro,
//                                                 @RequestParam("versionName") String versionName,
//                                                 @RequestParam
//                                                 )

//    public ResponseEntity<User> updateUser(HttpServletRequest request, HttpServletResponse response,
//                                           @RequestParam("id") long id,
//                                           @RequestParam("name") String name,
//                                           @RequestParam("email") String email) throws IOException {
//        User user = userService.getUser(id);
//        if (userService.getUser(id).getId() == user.getId()) {
//            User u = userService.updateUser(name, email, id);
//            if (u != null) {
//                return ResponseEntity.ok(u);
//            }
//        }
//        return ResponseEntity.badRequest().body(null);
//
//    }


    @PostMapping(value = "/add-version/{packageId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public Package addVersion(@PathVariable long packageId, @RequestPart String versionString, @RequestPart MultipartFile file){

        Version version = getVersion(versionString);

        String packageName = packageService.getPackage(packageId).getTitle();
        String fileName = packageName + "-" + version.getName() + ".zip";
        FileData fileData = pathToFileData(fileService.save(file, fileName));
        String url = fileData.getUrl();
        version.setUrl(url);
        version.setSize(fileData.getSize());
        version.setDateAdded(LocalDateTime.now());
        return packageService.addVersion(packageId, version);
    }

    private SystemRequirements getSystemRequirements(String util){
        SystemRequirements utilJson = new SystemRequirements();

        try{
            ObjectMapper mapper = new ObjectMapper();
            utilJson = mapper.readValue(util, SystemRequirements.class);
        } catch(IOException err){
            System.out.printf("Error ", err.toString());
        }
        return utilJson;
    }

    private NewPackageDTO getNewPackageDTO(String util){
        NewPackageDTO utilJson = new NewPackageDTO();

        try{
            ObjectMapper mapper = new ObjectMapper();
            utilJson = mapper.readValue(util, NewPackageDTO.class);
        } catch(IOException err){
            System.out.printf("Error ", err.toString());
        }
        return utilJson;
    }

    private Version getVersion(String util){
        Version utilJson = new Version();

        try{
            ObjectMapper mapper = new ObjectMapper();
            utilJson = mapper.readValue(util, Version.class);
        } catch(IOException err){
            System.out.printf("Error ", err.toString());
        }
        return utilJson;
    }

    @RequestMapping(value = "/delete/{packageId}", method = RequestMethod.DELETE)
    public void deletePackage(@PathVariable int packageId) {
        LOG.info("Deleting package.");
        packageService.deletePackage(packageId);
    }

    private FileData pathToFileData(Path path) {
        FileData fileData = new FileData();
        String filename = path.getFileName()
                .toString();
        fileData.setFilename(filename);
        fileData.setUrl(MvcUriComponentsBuilder.fromMethodName(PackageController.class, "getFile", filename)
                .build()
                .toString());
        try {
            fileData.setSize(Files.size(path));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error: " + e.getMessage());
        }

        return fileData;
    }

    @GetMapping("/download")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@RequestParam String filename) {
        Resource file = fileService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}