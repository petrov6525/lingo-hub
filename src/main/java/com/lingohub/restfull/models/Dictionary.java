package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Dictionary implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;
    private String name;
    private String originCode;
    private String translateCode;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Dictionary() {
    }

    public Dictionary(long id, String name, String originCode, String translateCode, User user) {
        this.id = id;
        this.name = name;
        this.originCode = originCode;
        this.translateCode = translateCode;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOriginCode() {
        return originCode;
    }

    public void setOriginCode(String originCode) {
        this.originCode = originCode;
    }

    public String getTranslateCode() {
        return translateCode;
    }

    public void setTranslateCode(String translateCode) {
        this.translateCode = translateCode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Dictionary{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", originCode='" + originCode + '\'' +
                ", translateCode='" + translateCode + '\'' +
                ", user=" + user +
                '}';
    }
}
