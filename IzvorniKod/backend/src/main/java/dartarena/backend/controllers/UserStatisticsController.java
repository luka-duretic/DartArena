package dartarena.backend.controllers;

import dartarena.backend.models.UserStatistics;
import dartarena.backend.services.UserStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userstats")
public class UserStatisticsController {
    @Autowired
    private UserStatisticsService userStatisticsService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserStatistics(@PathVariable String userId) {
        try{
            UserStatistics response = userStatisticsService.getUserStatistics(Long.parseLong(userId));
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
