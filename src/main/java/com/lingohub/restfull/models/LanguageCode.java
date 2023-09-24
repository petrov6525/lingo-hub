package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class LanguageCode implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int id;
    private String title;
    private String code;

    @Override
    public String toString() {
        return "LanguageCode{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", code='" + code + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LanguageCode(String title, String code) {
        this.title = title;
        this.code = code;
    }

    public LanguageCode() {
    }
}
