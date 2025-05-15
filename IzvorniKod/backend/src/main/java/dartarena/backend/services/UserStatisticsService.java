package dartarena.backend.services;

import dartarena.backend.models.UserStatistics;

public interface UserStatisticsService {
    UserStatistics getUserStatistics(Long id);
}
