package dartarena.backend.services.impl;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.exceptions.InvalidFormatException;
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
    private MatchParticipantRepository matchParticipantRepo;

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

    public List<MatchDto> getAllMatches(Long id){
        List<MatchDto> matches = new ArrayList<>();

        List<MatchParticipant> mps = matchParticipantRepo.findAllByUserId(id);
        if(mps.isEmpty()) throw new IllegalArgumentException("User matches not found.");

        try{
            for(MatchParticipant mp : mps){
                Match match = matchRepo.findById(mp.getMatch().getId());
                if(match == null || match.getMatchParticipants().size() < 1) throw new IllegalArgumentException("Match not found.");
                MatchParticipant mp1;
                if(match.getMatchParticipants().get(0).getUser().getId().equals(id))
                    mp1 = match.getMatchParticipants().get(0);
                else if(match.getMatchParticipants().size() == 2){
                    mp1 = match.getMatchParticipants().get(1);
                } else {
                    throw new IllegalArgumentException("Match participant not found.");
                }

                if(mp1 == null)
                    throw new InvalidFormatException("MatchParticipant with id " + mp1.getId() + " not found");
                User user1 = userRepo.findById(mp1.getUser().getId()).get();
                if(user1 == null)
                    throw new InvalidFormatException("User with id " + id + " not found");

                MatchDto dto = new MatchDto();
                dto.setGameMode(match.getGameMode());
                dto.setIsTraining(match.isTraining());

                dto.addAverage3Darts(mp1.getAverage3Darts());
                dto.addCheckoutDartsAverage(mp1.getCheckoutDartsAverage());
                dto.addScore100Plus(mp1.getScore100Plus());
                dto.addScore140Plus(mp1.getScore140Plus());
                dto.addScore170Plus(mp1.getScore170Plus());
                dto.addCheckoutPercentage(mp1.getCheckoutPrecentage());
                dto.addLegsWon(mp1.getLegsWon());
                dto.addScore170(mp1.getScore170());
                dto.addScore180(mp1.getScore180());
                dto.addScore60Plus(mp1.getScore60Plus());
                dto.addSetsWon(mp1.getSetsWon());
                dto.addUserEmail(user1.getEmail());

                if(match.getMatchParticipants().size() < 2){
                    if(match.isTraining()){
                        dto.setSubprofile("");
                    } else {
                        SubProfile sp = mp1.getSubprofile();
                        if(sp != null)
                            dto.setSubprofile(sp.getNickName());
                    }
                    dto.addAverage3Darts(0.0);
                    dto.addCheckoutDartsAverage(0.0);
                    dto.addScore100Plus(0);
                    dto.addScore140Plus(0);
                    dto.addScore170Plus(0);
                    dto.addCheckoutPercentage(0.0);
                    dto.addLegsWon(0);
                    dto.addScore170(0);
                    dto.addScore180(0);
                    dto.addScore60Plus(0);
                    dto.addSetsWon(0);
                    dto.addUserEmail("");
                } else {
                    MatchParticipant mp2;
                    if(match.getMatchParticipants().get(0).getUser().getId().equals(id))
                        mp2 = match.getMatchParticipants().get(1);
                    else
                        mp2 = match.getMatchParticipants().get(0);
                    if(mp2 == null)
                        throw new InvalidFormatException("MatchParticipant with id " + mp2.getId() + " not found");
                    User user2 = userRepo.findById(mp2.getUser().getId()).get();
                    if(user1 == null)
                        throw new InvalidFormatException("User with id " + id + " not found");
                    dto.addAverage3Darts(mp2.getAverage3Darts());
                    dto.addCheckoutDartsAverage(mp2.getCheckoutDartsAverage());
                    dto.addScore100Plus(mp2.getScore100Plus());
                    dto.addScore140Plus(mp2.getScore140Plus());
                    dto.addScore170Plus(mp2.getScore170Plus());
                    dto.addCheckoutPercentage(mp2.getCheckoutPrecentage());
                    dto.addLegsWon(mp2.getLegsWon());
                    dto.addScore170(mp2.getScore170());
                    dto.addScore180(mp2.getScore180());
                    dto.addScore60Plus(mp2.getScore60Plus());
                    dto.addSetsWon(mp2.getSetsWon());
                    dto.addUserEmail(user2.getEmail());
                }
                matches.add(dto);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Error while fetching matches: " + e.getMessage());
        }

        return matches;
    }
}
