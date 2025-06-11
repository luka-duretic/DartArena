package dartarena.backend.dto;

import java.util.*;

public class MatchDto {
    private List<Double> average3Darts = new ArrayList<>();
    private List<Double> checkoutDartsAverage = new ArrayList<>();
    private List<Double> checkoutPercentage = new ArrayList<>();
    private String gameMode;
    private boolean isTraining;
    private List<Integer> score60Plus = new ArrayList<>();
    private List<Integer> score100Plus = new ArrayList<>();
    private List<Integer> score140Plus = new ArrayList<>();
    private List<Integer> score170 = new ArrayList<>();
    private List<Integer> score170Plus = new ArrayList<>();
    private List<Integer> score180 = new ArrayList<>();
    private List<Integer> legsWon = new ArrayList<>();
    private List<Integer> setsWon = new ArrayList<>();
    private List<String> userEmail = new ArrayList<>();
    private String subprofile = "";

    public List<Double> getAverage3Darts() {
        return average3Darts;
    }

    public void setAverage3Darts(List<Double> average3Darts) {
        this.average3Darts = average3Darts;
    }

    public void addAverage3Darts(Double average3Darts) {
        this.average3Darts.add(average3Darts);
    }

    public List<Double> getCheckoutDartsAverage() {
        return checkoutDartsAverage;
    }

    public void setCheckoutDartsAverage(List<Double> checkoutDartsAverage) {
        this.checkoutDartsAverage = checkoutDartsAverage;
    }

    public void addCheckoutDartsAverage(Double checkoutDartsAverage) {
        this.checkoutDartsAverage.add(checkoutDartsAverage);
    }

    public List<Double> getCheckoutPercentage() {
        return checkoutPercentage;
    }

    public void setCheckoutPercentage(List<Double> checkoutPercentage) {
        this.checkoutPercentage = checkoutPercentage;
    }

    public void addCheckoutPercentage(Double checkoutPercentage) {
        this.checkoutPercentage.add(checkoutPercentage);
    }

    public String getGameMode() {
        return gameMode;
    }

    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

    public boolean isTraining() {
        return isTraining;
    }

    public void setIsTraining(boolean training) {
        isTraining = training;
    }

    public List<Integer> getLegsWon() {
        return legsWon;
    }

    public void setLegsWon(List<Integer> legsWon) {
        this.legsWon = legsWon;
    }

    public void addLegsWon(int legsWon) {
        this.legsWon.add(legsWon);
    }

    public List<Integer> getScore100Plus() {
        return score100Plus;
    }

    public void setScore100Plus(List<Integer> score100Plus) {
        this.score100Plus = score100Plus;
    }

    public void addScore100Plus(Integer score100Plus) {
        this.score100Plus.add(score100Plus);
    }

    public List<Integer> getScore140Plus() {
        return score140Plus;
    }

    public void setScore140Plus(List<Integer> score140Plus) {
        this.score140Plus = score140Plus;
    }

    public void addScore140Plus(Integer score140Plus) {
        this.score140Plus.add(score140Plus);
    }

    public List<Integer> getScore170() {
        return score170;
    }

    public void setScore170(List<Integer> score170) {
        this.score170 = score170;
    }

    public void addScore170(int score170) {
        this.score170.add(score170);
    }

    public List<Integer> getScore170Plus() {
        return score170Plus;
    }

    public void setScore170Plus(List<Integer> score170Plus) {
        this.score170Plus = score170Plus;
    }

    public void addScore170Plus(Integer score170Plus) {
        this.score170Plus.add(score170Plus);
    }

    public List<Integer> getScore180() {
        return score180;
    }

    public void setScore180(List<Integer> score180) {
        this.score180 = score180;
    }

    public void addScore180(int score180) {
        this.score180.add(score180);
    }

    public List<Integer> getScore60Plus() {
        return score60Plus;
    }

    public void setScore60Plus(List<Integer> score60Plus) {
        this.score60Plus = score60Plus;
    }

    public void addScore60Plus(int score60Plus) {
        this.score60Plus.add(score60Plus);
    }

    public List<Integer> getSetsWon() {
        return setsWon;
    }

    public void setSetsWon(List<Integer> setsWon) {
        this.setsWon = setsWon;
    }

    public void addSetsWon(int setsWon) {
        this.setsWon.add(setsWon);
    }

    public String getSubprofile() {
        return subprofile;
    }

    public void setSubprofile(String subprofile) {
        this.subprofile = subprofile;
    }

    public List<String> getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(List<String> userEmail) {
        this.userEmail = userEmail;
    }

    public void addUserEmail(String userEmail) {
        this.userEmail.add(userEmail);
    }
}
