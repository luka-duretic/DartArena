package dartarena.backend.controllers;

import dartarena.backend.dto.*;
import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.exceptions.LoginException;
import dartarena.backend.models.User;
import dartarena.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    // prijavi user-a
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto user) {
        try{
            LoginResponseDto response = userService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: Invalid parameter format " + e.getMessage());
        }
    }

    // registriraj novog user-a
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto user) {
        try{
            User newUser = new User(user.getCountry(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getNickName(), user.getPassword());
            if(user.getTeam() != null && user.getTeam().length() >= 4)
                newUser.setTeam(user.getTeam());
            if(user.getLeague() != null && user.getLeague().length() >= 4)
                newUser.setLeague(user.getLeague());

            LoginResponseDto response = userService.registerUser(newUser);

            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: Invalid parameter format " + e.getMessage());
        }
    }

    // postavi sliku profila
    @PostMapping("/update-profile-picture/{userId}")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable String userId,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            Map<String, String> message = userService.updateProfilePicture(Long.parseLong(userId), imageFile);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    // dohvati sve user-e
    @GetMapping("/all")
    public List<UserResponseDto> getUsers() {
        List<UserResponseDto> response = userService.getAllUser().stream().map(u -> new UserResponseDto(u)).toList();
        return response;
    }

    // dohvati user-a sa id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") String id) {
        try{
            UserResponseDto response = userService.getUser(Long.parseLong(id));
            if(response != null)
                return ResponseEntity.ok(response);
            else
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + id + " not found");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured " + e.getMessage());
        }
    }

    // azuriraj user-a
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody UserUpdateDto user) {
        try{
            UserResponseDto response = userService.updateUser(Long.parseLong(id), user);
            return ResponseEntity.ok(response);

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
