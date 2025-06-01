package dartarena.backend.services.impl;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.models.Match;
import dartarena.backend.models.MatchParticipant;
import dartarena.backend.models.SubProfile;
import dartarena.backend.models.User;
import dartarena.backend.repository.MatchParticipantRepository;
import dartarena.backend.repository.MatchRepository;
import dartarena.backend.repository.SubProfileRepository;
import dartarena.backend.repository.UserRepository;
import dartarena.backend.services.MatchService;
import dartarena.backend.services.UserStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MatchServiceJpa implements MatchService {
    @Autowired
    private UserStatisticsService statisticsService;

    @Autowired
    private MatchRepository matchRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SubProfileRepository subProfileRepo;

    // funkcija koja stvara/sprema novi match i njegove sudionike
    @Override
    public Map<String, String> archiveMatch(MatchDto match) {
        if(match == null) throw new IllegalArgumentException("Match data are empty.");
        Map<String, String> response = new HashMap<>();
        List<MatchParticipant> list  = new ArrayList<>();

        try {
            Match newMatch = new Match(match.getGameMode(), match.isTraining());

            User user1 = userRepo.findByEmail(match.getUserEmail().get(0));
            if(user1 == null) throw new IllegalArgumentException("First player not found.");
            MatchParticipant newParticipant1 = new MatchParticipant(
                    match.getAverage3Darts().get(0),
                    match.getCheckoutDartsAverage().get(0),
                    match.getCheckoutPercentage().get(0),
                    match.getLegsWon().get(0),
                    newMatch,
                    match.getScore100Plus().get(0),
                    match.getScore140Plus().get(0),
                    match.getScore170().get(0),
                    match.getScore170Plus().get(0),
                    match.getScore180().get(0),
                    match.getScore60Plus().get(0),
                    match.getSetsWon().get(0),
                    user1
            );
            String res = statisticsService.updateUserStatistics(user1.getId(), match, 0);
            if(!res.equals("success"))
                throw new IllegalArgumentException("Error updating first player statistics.");

            if(!match.getUserEmail().get(1).contains("@")){
                if(!match.getUserEmail().get(1).equals("")){
                    SubProfile subProfile = subProfileRepo.findByNickNameAndUser(match.getSubprofile(), user1);
                    if(subProfile == null) throw new IllegalArgumentException("User's subprofile not found.");
                    newParticipant1.setSubprofile(subProfile);
                }
            } else {
                User user2 = userRepo.findByEmail(match.getUserEmail().get(1));
                if(user2 == null) throw new IllegalArgumentException("Second player not found.");
                MatchParticipant newParticipant2 = new MatchParticipant(
                        match.getAverage3Darts().get(1),
                        match.getCheckoutDartsAverage().get(1),
                        match.getCheckoutPercentage().get(1),
                        match.getLegsWon().get(1),
                        newMatch,
                        match.getScore100Plus().get(1),
                        match.getScore140Plus().get(1),
                        match.getScore170().get(1),
                        match.getScore170Plus().get(1),
                        match.getScore180().get(1),
                        match.getScore60Plus().get(1),
                        match.getSetsWon().get(1),
                        user2
                );
                String res2 = statisticsService.updateUserStatistics(user2.getId(), match, 1);
                if(!res2.equals("success"))
                    throw new IllegalArgumentException("Error updating second player statistics.");
                list.add(newParticipant2);
            }
            list.addFirst(newParticipant1);

            newMatch.setMatchParticipants(list);
            // automatski save-a sudionike u njihovu bazu, koje smo set-ali u atributu "list"
            matchRepo.save(newMatch);
            response.put("message", "match and participants saved");
            return response;
        } catch(Exception e){
            throw new IllegalArgumentException("Error while creating new match.");
        }
    }
}
