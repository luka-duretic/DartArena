package dartarena.backend.services.impl;

import dartarena.backend.dto.UserResponseDto;
import dartarena.backend.dto.UserStatisticsDto;
import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.models.User;
import dartarena.backend.models.UserStatistics;
import dartarena.backend.repository.UserRepository;
import dartarena.backend.repository.UserStatisticsRepository;
import dartarena.backend.services.UserStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStatisticsServiceJpa implements UserStatisticsService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserStatisticsRepository userStatisticsRepo;

    @Override
    public UserStatisticsDto getUserStatistics(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new InvalidFormatException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto(user);
        UserStatistics userStatistics = userStatisticsRepo.findByUser(user);
        if(userStatistics == null)
            new InvalidFormatException("User's stats not found");

        UserStatisticsDto response = new UserStatisticsDto();
        response.setUser(userResponseDto);
        response.setTotal170(userStatistics.getTotal170());
        response.setTotal180(userStatistics.getTotal180());
        response.setTotal170Plus(userStatistics.getTotal170Plus());
        response.setTotalMatches(userStatistics.getTotalMatches());

        return response;
    }
}
