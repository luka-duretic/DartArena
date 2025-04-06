package dartarena.backend.controllers;

import dartarena.backend.dto.LoginResponseDto;
import dartarena.backend.dto.UserLoginDto;
import dartarena.backend.dto.UserRegisterDto;
import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.exceptions.LoginException;
import dartarena.backend.models.User;
import dartarena.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto user) {
        try{
            LoginResponseDto response = userService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: Invalid parameter format " + e.getMessage());
        }
    }

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

    @GetMapping
    public String getUser() {
        String response = "No users yet";
        List<User> tmp = userService.getAllUser();
        if(tmp.size() > 0) {
            StringBuilder sb = new StringBuilder();
            tmp.forEach(user -> sb.append(user + "\n"));
            response = sb.toString();
        }

        return response;
    }
}
