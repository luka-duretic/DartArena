package dartarena.backend.dto;

import java.time.LocalDateTime;
import java.util.*;

public class StatsAllDto {
    private List<LocalDateTime> dates = new ArrayList<>();
    private List<Double> averages3Darts = new ArrayList<>();
    private List<Double> checkoutDartsAverages = new ArrayList<>();
    private List<Double> checkoutPercentages = new ArrayList<>();
    private List<Integer> score60Plus = new ArrayList<>();
    private List<Integer> score100Plus = new ArrayList<>();
    private List<Integer> score140Plus = new ArrayList<>();

    public void addDate(LocalDateTime date) {
        dates.add(date);
    }

    public void addAverages3Darts(double averages3Darts) {
        this.averages3Darts.add(averages3Darts);
    }

    public void addCheckoutDartsAverages(double checkoutDartsAverages) {
        this.checkoutDartsAverages.add(checkoutDartsAverages);
    }

    public void addCheckoutPercentages(double checkoutPercentages) {
        this.checkoutPercentages.add(checkoutPercentages);
    }

    public void addScore60Plus(int score60Plus) {
        this.score60Plus.add(score60Plus);
    }

    public void addScore100Plus(int score100Plus) {
        this.score100Plus.add(score100Plus);
    }

    public void addScore140Plus(int score140Plus) {
        this.score140Plus.add(score140Plus);
    }

    public List<Double> getAverages3Darts() {
        return averages3Darts;
    }

    public List<Double> getCheckoutDartsAverages() {
        return checkoutDartsAverages;
    }

    public List<Double> getCheckoutPercentages() {
        return checkoutPercentages;
    }

    public List<LocalDateTime> getDates() {
        return dates;
    }

    public List<Integer> getScore100Plus() {
        return score100Plus;
    }

    public List<Integer> getScore140Plus() {
        return score140Plus;
    }

    public List<Integer> getScore60Plus() {
        return score60Plus;
    }
}