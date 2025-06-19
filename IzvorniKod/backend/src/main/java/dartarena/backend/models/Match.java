package dartarena.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.*;

@Entity
public class Match {
    @Id @GeneratedValue
    private Long id;

    @NotNull
    private String gameMode;

    @NotNull
    private LocalDateTime matchDate;

    @NotNull
    private boolean isTraining;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    // mappedBy je veza na ime atributa u MatchParticipants, cascade brise sve MatchParticipants ako se obrise match, a zadnji atribut brise MatchParticipants koji izgubi referencu na match roditelja
    // isto tako ovo omgucava da kada save-amo match entitet automatski se save-aju i matchParticipants svaki posebno
    private List<MatchParticipant> matchParticipants;

    public Match() {
        this.matchDate = LocalDateTime.now();
    }

    public Match(String gameMode, boolean isTraining) {
        this.gameMode = gameMode;
        this.isTraining = isTraining;
        this.matchDate = LocalDateTime.now();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public @NotNull String getGameMode() {
        return gameMode;
    }

    public void setGameMode(@NotNull String gameMode) {
        this.gameMode = gameMode;
    }

    @NotNull
    public boolean isTraining() {
        return isTraining;
    }

    public void setTraining(@NotNull boolean training) {
        isTraining = training;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public List<MatchParticipant> getMatchParticipants() {
        return matchParticipants;
    }

    public void setMatchParticipants(List<MatchParticipant> matchParticipants) {
        this.matchParticipants = matchParticipants;
    }
}
