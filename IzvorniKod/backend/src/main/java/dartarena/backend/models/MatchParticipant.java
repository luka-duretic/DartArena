package dartarena.backend.models;

import jakarta.persistence.*;

@Entity
public class MatchParticipant {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne @JoinColumn(name = "user_id", nullable = true)
    // Može biti null ako je subprofile
    private User user;

    @ManyToOne @JoinColumn(name = "subprofile_id", nullable = true)
    // Može biti null ako je user
    private SubProfile subprofile;

    @ManyToOne @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    private Double average3Darts;

    private Double checkoutDartsAverage;

    private Double checkoutPercentage;

    private int score60Plus;

    private int score100Plus;

    private int score140Plus;

    private int score170;

    private int score170Plus;

    private int score180;

    private int legsWon;

    private int setsWon;

    public MatchParticipant(Double average3Darts, Double checkoutDartsAverage, Double checkoutPercentage, int legsWon, Match match, int score100Plus, int score140Plus, int score170, int score170Plus, int score180, int score60Plus, int setsWon, User user) {
        this.average3Darts = average3Darts;
        this.checkoutDartsAverage = checkoutDartsAverage;
        this.checkoutPercentage = checkoutPercentage;
        this.legsWon = legsWon;
        this.match = match;
        this.score100Plus = score100Plus;
        this.score140Plus = score140Plus;
        this.score170 = score170;
        this.score170Plus = score170Plus;
        this.score180 = score180;
        this.score60Plus = score60Plus;
        this.setsWon = setsWon;
        this.user = user;
    }

    public MatchParticipant() {}

    public Double getAverage3Darts() {
        return average3Darts;
    }

    public void setAverage3Darts(Double average3Darts) {
        this.average3Darts = average3Darts;
    }

    public Double getCheckoutDartsAverage() {
        return checkoutDartsAverage;
    }

    public void setCheckoutDartsAverage(Double checkoutDartsAverage) {
        this.checkoutDartsAverage = checkoutDartsAverage;
    }

    public Double getCheckoutPrecentage() {
        return checkoutPercentage;
    }

    public void setCheckoutPrecentage(Double checkoutPrecentage) {
        this.checkoutPercentage = checkoutPrecentage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getLegsWon() {
        return legsWon;
    }

    public void setLegsWon(int legsWon) {
        this.legsWon = legsWon;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public int getScore100Plus() {
        return score100Plus;
    }

    public void setScore100Plus(int score100Plus) {
        this.score100Plus = score100Plus;
    }

    public int getScore140Plus() {
        return score140Plus;
    }

    public void setScore140Plus(int score140Plus) {
        this.score140Plus = score140Plus;
    }

    public int getScore170() {
        return score170;
    }

    public void setScore170(int score170) {
        this.score170 = score170;
    }

    public int getScore180() {
        return score180;
    }

    public void setScore180(int score180) {
        this.score180 = score180;
    }

    public int getScore60Plus() {
        return score60Plus;
    }

    public void setScore60Plus(int score60Plus) {
        this.score60Plus = score60Plus;
    }

    public int getSetsWon() {
        return setsWon;
    }

    public void setSetsWon(int setsWon) {
        this.setsWon = setsWon;
    }

    public SubProfile getSubprofile() {
        return subprofile;
    }

    public void setSubprofile(SubProfile subprofile) {
        this.subprofile = subprofile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getScore170Plus() {
        return score170Plus;
    }

    public void setScore170Plus(int score170plus) {
        this.score170Plus = score170plus;
    }
}
