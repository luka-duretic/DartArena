package dartarena.backend.repository;

import dartarena.backend.models.SubProfile;
import dartarena.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubProfileRepository extends JpaRepository<SubProfile, Long> {
    SubProfile findByNickName(String nickname);
    List<SubProfile> findByUser(User user);
    void deleteById(long id);
    boolean existsById(long id);
}
