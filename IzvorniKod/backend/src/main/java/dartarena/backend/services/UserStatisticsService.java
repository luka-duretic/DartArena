package dartarena.backend.services;

import dartarena.backend.dto.UserStatisticsDto;

public interface UserStatisticsService {
    UserStatisticsDto getUserStatistics(Long id);
}
