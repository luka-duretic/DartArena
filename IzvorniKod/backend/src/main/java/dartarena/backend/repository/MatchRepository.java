package dartarena.backend.repository;

import dartarena.backend.models.Match;
import dartarena.backend.models.MatchParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, MatchParticipant> {
    Match findById(Long matchId);
}
