package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class TranslateStatistic implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "language_code_id", referencedColumnName = "id")
    private LanguageCode languageCode;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private int count = 0;

    public TranslateStatistic() {
    }

    public TranslateStatistic(int id, LanguageCode languageCode, User user, int count) {
        this.id = id;
        this.languageCode = languageCode;
        this.user = user;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LanguageCode getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(LanguageCode languageCode) {
        this.languageCode = languageCode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "TranslateStatistic{" +
                "id=" + id +
                ", languageCode=" + languageCode +
                ", user=" + user +
                ", count=" + count +
                '}';
    }
}
