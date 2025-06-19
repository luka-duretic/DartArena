package dartarena.backend.controllers;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.dto.StatsAllDto;
import dartarena.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dartarena.backend.services.impl.MatchParticipantServiceJpa;

import java.util.*;

@RestController
@RequestMapping("/match-participant")
public class MatchParticipantController {
    @Autowired
    private MatchParticipantServiceJpa matchParticipantService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // dohvati svu statistiku kroz match-eve user-a
    @GetMapping("/getStats/{mode}")
    public ResponseEntity<?> getAllStats(@RequestHeader("Authorization") String token, @PathVariable String mode) {
        String newToken = token.substring(7);
        Long id = jwtTokenProvider.getUserIdFromToken(newToken);

        try{
            StatsAllDto response = matchParticipantService.getUserStats(id, mode);
            return ResponseEntity.ok(response);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error accured: " + e.getMessage());
        }
    }
}
