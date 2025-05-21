package dartarena.backend.services.impl;

import dartarena.backend.dto.LoginResponseDto;
import dartarena.backend.dto.UserResponseDto;
import dartarena.backend.dto.UserUpdateDto;
import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.exceptions.LoginException;
import dartarena.backend.models.User;
import dartarena.backend.models.UserStatistics;
import dartarena.backend.repository.UserRepository;
import dartarena.backend.repository.UserStatisticsRepository;
import dartarena.backend.security.JwtTokenProvider;
import dartarena.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest;
import java.util.*;

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtProvider;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserStatisticsRepository userStatisticsRepo;

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service.role}")
    private String serviceRole;

    @Override
    public List<User> getAllUser(){
        return userRepo.findAll();
    }

    @Override
    public LoginResponseDto registerUser(User user) {
        boolean exists = userRepo.existsByEmail(user.getEmail());
        if (exists)
            throw new LoginException("- E-mail is already in use");

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepo.save(user);

        UserStatistics stats = new UserStatistics();
        stats.setUser(user);
        userStatisticsRepo.save(stats);

        return new LoginResponseDto(jwtProvider.generateToken(user.getEmail(), user.getId()), user);
    }

    @Override
    public LoginResponseDto loginUser(String email, String password) {
        User user = userRepo.findByEmail(email);

        if (user == null)
            throw new LoginException("- Invalid email or password");
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new LoginException("- Invalid email or password");

        return new LoginResponseDto(jwtProvider.generateToken(user.getEmail(), user.getId()), user);
    }

    @Override
    public UserResponseDto getUser(long id) {
        User user = userRepo.findById(id);

        if (user == null)
            throw new LoginException("- User with id " + id + " not found");

        return new UserResponseDto(user);
    }

    @Override
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepo.findByEmail(email);

        if (user == null)
            throw new LoginException("- User with email " + email + " not found");

        return new UserResponseDto(user);
    }

    @Override
    public UserResponseDto updateUser(long id, UserUpdateDto userInfo) {
        User user = userRepo.findById(id);
        if (user == null)
            throw new InvalidFormatException("User with id " + id + " not found");

        if(userRepo.existsByEmail(userInfo.getEmail()) && !user.getEmail().equals(userInfo.getEmail()))
            throw new InvalidFormatException("Email is already in use");
        else
            user.setEmail(userInfo.getEmail());

        if(!user.getFirstName().equals(userInfo.getFirstName()))
            user.setFirstName(userInfo.getFirstName());
        if(!user.getLastName().equals(userInfo.getLastName()))
            user.setLastName(userInfo.getLastName());
        if(!user.getNickName().equals(userInfo.getNickName()))
            user.setNickName(userInfo.getNickName());
        if(user.getDartsName() == null || !user.getDartsName().equals(userInfo.getDartsName()))
            user.setDartsName(userInfo.getDartsName());
        if(user.getDartsWeight() == null || !user.getDartsWeight().equals(userInfo.getDartsWeight()))
            user.setDartsWeight(userInfo.getDartsWeight());
        if(user.getLeague() == null || !user.getLeague().equals(userInfo.getLeague()))
            user.setLeague(userInfo.getLeague());
        if(user.getTeam() == null || !user.getTeam().equals(userInfo.getTeam()))
            user.setTeam(userInfo.getTeam());

        userRepo.save(user);

        return new UserResponseDto(user);
    }

    @Override
    public Map<String, String> updateProfilePicture(long userId, MultipartFile file) throws Exception {
        User user = userRepo.findById(userId);
        if(user == null)
            throw new InvalidFormatException("User with id " + userId + " not found");
        if(file.isEmpty())
            throw new InvalidFormatException("File is empty");

        String fileName = "profile_" + userId + "_" + UUID.randomUUID() + "." + getFileExtension(file.getOriginalFilename());
        String bucketName = "avatars";

        // ako korisnik vec ima sliku, obrisi jer ces zamjenit novom
        if (user.getProfileImgURL() != null) {
            String oldFileName = user.getProfileImgURL().substring(user.getProfileImgURL().lastIndexOf("/") + 1);

            // izgradnja URL-a za brisanje stare slike
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest deleteRequest = HttpRequest.newBuilder()
                    .uri(URI.create(supabaseUrl + "/storage/v1/object/" + bucketName + "/" + oldFileName))
                    .header("Authorization", "Bearer " + serviceRole)
                    .DELETE()
                    .build();

            HttpResponse<String> deleteResponse = client.send(deleteRequest, HttpResponse.BodyHandlers.ofString());

            if (deleteResponse.statusCode() != 200 && deleteResponse.statusCode() != 204) {
                throw new Exception("Failed to delete the old image: " + deleteResponse.body());
            }
        }

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileName))
                .header("Authorization", "Bearer " + serviceRole)
                .header("Content-Type", file.getContentType())
                .PUT(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String imgUrl = "";
        if (response.statusCode() == 200 || response.statusCode() == 201) {
            imgUrl =  supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileName;

            user.setProfileImgURL(imgUrl);
            userRepo.save(user);
            Map<String, String> message = new HashMap<>();
            message.put("message", "New profile picture uploaded");
            return message;
        } else {
            throw new RuntimeException("Supabase upload failed: " + response.body());
        }
    }

    @Override
    public List<UserResponseDto> searchUsers(String search) {
        List<User> users = new ArrayList<>();
        List<UserResponseDto> usersResult = new ArrayList<>();

        users.addAll(userRepo.findAllByNickNameIgnoreCaseStartingWith(search));
        users.forEach(user -> usersResult.add(new UserResponseDto(user)));

        return usersResult;
    }

    private String getFileExtension(String filename) {
        if (filename == null) return "";
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
}
