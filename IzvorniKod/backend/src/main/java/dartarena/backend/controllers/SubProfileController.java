package dartarena.backend.controllers;

import dartarena.backend.models.SubProfile;
import dartarena.backend.services.SubProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/subprofile")
public class SubProfileController {
    @Autowired
    private SubProfileService subProfileService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> create(@PathVariable String userId, @RequestParam("nickname") String nickName) {
        try{
            SubProfile response = subProfileService.createSubProfile(Long.parseLong(userId), nickName);
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{subprofileId}")
    public ResponseEntity<?> delete(@PathVariable String subprofileId) {
        try{
            Map<String, String> response = subProfileService.deleteSubProfile(Long.parseLong(subprofileId));
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAll(@PathVariable String userId) {
        try{
            List<SubProfile> response = subProfileService.getSubProfiles(Long.parseLong(userId));
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
