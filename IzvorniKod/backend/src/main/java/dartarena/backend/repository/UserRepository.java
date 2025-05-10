package dartarena.backend.repository;

import dartarena.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findById(long id);
    Boolean existsByEmail(String email);
}
