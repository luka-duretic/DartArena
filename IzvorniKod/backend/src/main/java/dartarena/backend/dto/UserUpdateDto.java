package dartarena.backend.dto;

public class UserUpdateDto {
    private String email;
    private String firstName;
    private String lastName;
    private String nickName;
    private String team;
    private String league;
    private String dartsName;
    private Double dartsWeight;

    public UserUpdateDto() {}

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

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
}
