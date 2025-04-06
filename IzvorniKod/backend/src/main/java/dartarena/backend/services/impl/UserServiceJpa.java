package dartarena.backend.services.impl;

import dartarena.backend.dto.LoginResponseDto;
import dartarena.backend.exceptions.LoginException;
import dartarena.backend.models.User;
import dartarena.backend.repository.UserRepository;
import dartarena.backend.security.JwtTokenProvider;
import dartarena.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtProvider;
    @Autowired
    private UserRepository userRepo;

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
}
