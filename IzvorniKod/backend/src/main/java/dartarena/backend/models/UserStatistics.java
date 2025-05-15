package dartarena.backend.models;

import jakarta.persistence.*;

@Entity
public class UserStatistics {
    @Id
    private Long id; // ID je isti kao user_id

    @OneToOne
    @MapsId // Ovaj atribut koristi id iz User kao primarni ključ
    @JoinColumn(name = "id") // Ime stranog ključa u bazi
    private User user;

    private int totalMatches;

    private int total180;

    private int total170;

    private int total170Plus;

    public UserStatistics() {
        totalMatches = 0;
        total180 = 0;
        total170 = 0;
        total170Plus = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
