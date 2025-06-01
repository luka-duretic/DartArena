package dartarena.backend.services;

import dartarena.backend.dto.MatchDto;
import dartarena.backend.dto.UserStatisticsDto;

public interface UserStatisticsService {
    UserStatisticsDto getUserStatistics(Long id);
    String updateUserStatistics(Long id, MatchDto matchDto, int index);
}
