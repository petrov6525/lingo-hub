package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Dictionary implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "origin_code_id", referencedColumnName = "id")
    private LanguageCode originCode;
    @ManyToOne
    @JoinColumn(name = "translate_code_id", referencedColumnName = "id")
    private LanguageCode translateCode;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "dictionary")
    private List<Word> words = new ArrayList<>();


    public Dictionary() {
    }

    @Override
    public String toString() {
        return "Dictionary{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", originCode=" + originCode +
                ", translateCode=" + translateCode +
                ", user=" + user +
                '}';
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

    public LanguageCode getOriginCode() {
        return originCode;
    }

    public void setOriginCode(LanguageCode originCode) {
        this.originCode = originCode;
    }

    public LanguageCode getTranslateCode() {
        return translateCode;
    }

    public void setTranslateCode(LanguageCode translateCode) {
        this.translateCode = translateCode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Dictionary( String name, LanguageCode originCode, LanguageCode translateCode, User user) {
        this.name = name;
        this.originCode = originCode;
        this.translateCode = translateCode;
        this.user = user;
    }
}
