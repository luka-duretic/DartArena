package dartarena.backend.repository;

import dartarena.backend.models.Match;
import dartarena.backend.models.MatchParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface MatchParticipantRepository extends JpaRepository<MatchParticipant, Match> {
    public List<MatchParticipant> findAllByUserId(Long id);
}
