package dartarena.backend.repository;

import dartarena.backend.dto.UserResponseDto;
import dartarena.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findById(long id);
    Boolean existsByEmail(String email);
    List<User> findAllByNickNameIgnoreCaseStartingWith(String prefix);
}
