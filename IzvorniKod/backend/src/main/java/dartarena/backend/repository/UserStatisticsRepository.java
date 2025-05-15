package dartarena.backend.repository;

import dartarena.backend.models.User;
import dartarena.backend.models.UserStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {
    UserStatistics findByUser(User user);
}
