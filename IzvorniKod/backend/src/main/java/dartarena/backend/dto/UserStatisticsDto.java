package dartarena.backend.dto;

import dartarena.backend.dto.UserResponseDto;

public class UserStatisticsDto {
    private UserResponseDto user;

    private int totalMatches;

    private int total180;

    private int total170;

    private int total170Plus;

    public UserStatisticsDto() {}

    public int getTotal170() {
        return total170;
    }

    public void setTotal170(int total170) {
        this.total170 = total170;
    }

    public int getTotal170Plus() {
        return total170Plus;
    }

    public void setTotal170Plus(int total170Plus) {
        this.total170Plus = total170Plus;
    }

    public int getTotal180() {
        return total180;
    }

    public void setTotal180(int total180) {
        this.total180 = total180;
    }

    public int getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(int totalMatches) {
        this.totalMatches = totalMatches;
    }

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }
}
