package dartarena.backend.services;
import dartarena.backend.dto.LoginResponseDto;
import dartarena.backend.models.User;
import java.util.*;

public interface UserService {
    List<User> getAllUser();
    LoginResponseDto registerUser(User user);
    LoginResponseDto loginUser(String email, String password);
}
