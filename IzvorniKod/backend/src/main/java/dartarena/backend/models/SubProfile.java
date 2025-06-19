package dartarena.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class SubProfile {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne @JoinColumn(name = "user_id", nullable = false)
    // Strani ključ prema User entitetu
    private User user;

    @Size(min = 4, max = 50) @NotNull
    private String nickName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @Size(min = 4, max = 50) @NotNull String getNickName() {
        return nickName;
    }

    public void setNickName(@Size(min = 4, max = 50) @NotNull String nickName) {
        this.nickName = nickName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
