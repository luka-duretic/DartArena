package dartarena.backend.dto;
import dartarena.backend.models.User;

import java.time.LocalDateTime;

public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String nickName;
    private String country;
    private LocalDateTime joinDate;
    private String team;
    private String league;
    private String dartsName;
    private Double dartsWeight;
    private String profileImgURL;

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.country = user.getCountry();
        this.dartsName = user.getDartsName();
        this.dartsWeight = user.getDartsWeight();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.joinDate = user.getJoinDate();
        this.lastName = user.getLastName();
        this.league = user.getLeague();
        this.nickName = user.getNickName();
        this.profileImgURL = user.getProfileImgURL();
        this.team = user.getTeam();
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDartsName() {
        return dartsName;
    }

    public void setDartsName(String dartsName) {
        this.dartsName = dartsName;
    }

    public Double getDartsWeight() {
        return dartsWeight;
    }

    public void setDartsWeight(Double dartsWeight) {
        this.dartsWeight = dartsWeight;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLeague() {
        return league;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getProfileImgURL() {
        return profileImgURL;
    }

    public void setProfileImgURL(String profileImgURL) {
        this.profileImgURL = profileImgURL;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
}
