package dartarena.backend.services;
import dartarena.backend.dto.LoginResponseDto;
import dartarena.backend.dto.UserResponseDto;
import dartarena.backend.dto.UserUpdateDto;
import dartarena.backend.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

public interface UserService {
    List<User> getAllUser();
    LoginResponseDto registerUser(User user);
    LoginResponseDto loginUser(String email, String password);
    UserResponseDto getUser(long id);
    UserResponseDto getUserByEmail(String email);
    UserResponseDto updateUser(long id, UserUpdateDto userInfo);
    Map<String, String> updateProfilePicture(long id, MultipartFile file) throws Exception;
    List<UserResponseDto> searchUsers(String search);
    Map<String, String> validateUserPasswd(String email, String password);
}
