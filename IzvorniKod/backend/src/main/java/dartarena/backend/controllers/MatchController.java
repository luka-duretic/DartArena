package dartarena.backend.controllers;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.dto.UserLoginDto;
import dartarena.backend.services.impl.MatchServiceJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/match")
public class MatchController {
    @Autowired
    private MatchServiceJpa matchService;

    // pohrani novi match
    @PostMapping("/save")
    public ResponseEntity<?> validateUser(@RequestBody MatchDto match) {
        try{
            Map<String, String> response = matchService.archiveMatch(match);
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
