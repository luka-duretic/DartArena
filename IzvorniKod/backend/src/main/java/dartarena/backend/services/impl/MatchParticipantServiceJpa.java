package dartarena.backend.services.impl;

import dartarena.backend.dto.StatsAllDto;
import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.models.Match;
import dartarena.backend.models.MatchParticipant;
import dartarena.backend.repository.MatchParticipantRepository;
import dartarena.backend.repository.MatchRepository;
import dartarena.backend.services.MatchParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchParticipantServiceJpa implements MatchParticipantService {
    @Autowired
    private MatchParticipantRepository matchParticipantRepo;

    @Autowired
    private MatchRepository matchRepo;

    @Override
    public StatsAllDto getUserStats(Long userId, String mode) {
        StatsAllDto statsAllDto = new StatsAllDto();

        try {
            List<MatchParticipant> matchParticipant = matchParticipantRepo.findAllByUserId(userId);
            if (matchParticipant.isEmpty()) {
                throw new InvalidFormatException("Match participants not found");
            }
            for(MatchParticipant mp: matchParticipant){
                Match match = matchRepo.findById(mp.getMatch().getId());
                if(match == null) {
                    throw new InvalidFormatException("Match not found");
                } else {
                    String realMode = match.getGameMode().split("\\(")[0];
                    if(!realMode.equals(mode))
                        continue;
                }
                statsAllDto.addDate(match.getMatchDate());
                statsAllDto.addAverages3Darts(mp.getAverage3Darts());
                statsAllDto.addCheckoutDartsAverages(mp.getCheckoutDartsAverage());
                statsAllDto.addCheckoutPercentages(mp.getCheckoutPrecentage());
                statsAllDto.addScore60Plus(mp.getScore60Plus());
                statsAllDto.addScore100Plus(mp.getScore100Plus());
                statsAllDto.addScore140Plus(mp.getScore140Plus());
            }
        } catch (Exception e){
            throw new IllegalArgumentException("error while processing user's stats: " + e.getMessage());
        }

        return statsAllDto;
    }
}
