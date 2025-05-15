package dartarena.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;        //hashirana

    @Column(nullable = false) @Size(min = 2, max = 50)
    private String firstName;

    @Column(nullable = false) @Size(min = 2, max = 50)
    private String lastName;

    @Size(min = 4, max = 50) @Column(nullable = false)
    private String nickName;

    @Column(nullable = false)
    private String country;

    private LocalDateTime joinDate;

    @Size(min = 4, max = 50)
    private String team;

    @Size(min = 4, max = 50)
    private String league;

    private String dartsName;

    private Double dartsWeight;

    private String profileImgURL;

    public User(){
        this.joinDate = LocalDateTime.now();
    }

    public User(String country, String email, String firstName, String lastName, String nickName, String password) {
        this.country = country;
        this.email = email;
        this.firstName = firstName;
        this.joinDate = LocalDateTime.now();
        this.lastName = lastName;
        this.nickName = nickName;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getNickName(){
        return nickName;
    }

    public void setNickName(String nickname){
        this.nickName = nickname;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
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

    public @Size(min = 4, max = 50) String getLeague() {
        return league;
    }

    public void setLeague(@Size(min = 4, max = 50) String league) {
        this.league = league;
    }

    public String getProfileImgURL() {
        return profileImgURL;
    }

    public void setProfileImgURL(String profileImgURL) {
        this.profileImgURL = profileImgURL;
    }

    public @Size(min = 4, max = 50) String getTeam() {
        return team;
    }

    public void setTeam(@Size(min = 4, max = 50) String team) {
        this.team = team;
    }
}
