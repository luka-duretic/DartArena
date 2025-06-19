package dartarena.backend.controllers;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.security.JwtTokenProvider;
import dartarena.backend.services.impl.MatchServiceJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/match")
public class MatchController {
    @Autowired
    private MatchServiceJpa matchService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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

    // dohvati sve match-eve user-a
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllMatches(@RequestHeader("Authorization") String token) {
        String newToken = token.substring(7);
        Long id = jwtTokenProvider.getUserIdFromToken(newToken);

        try{
            List<MatchDto> response = matchService.getAllMatches(id);
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
