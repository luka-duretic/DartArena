package dartarena.backend.services;

import dartarena.backend.dto.StatsAllDto;

public interface MatchParticipantService {
    StatsAllDto getUserStats(Long id, String mode);
}
