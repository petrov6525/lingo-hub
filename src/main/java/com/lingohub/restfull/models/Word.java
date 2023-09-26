package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class Word implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;
    private String origin;
    private String translate;
    private String originCode;
    private String translateCode;
    @ManyToOne
    @JoinColumn(name = "dictionary_id", referencedColumnName = "id")
    private Dictionary dictionary;

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id +
                ", origin='" + origin + '\'' +
                ", translate='" + translate + '\'' +
                ", originCode='" + originCode + '\'' +
                ", translateCode='" + translateCode + '\'' +
                ", dictionary=" + dictionary +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getTranslate() {
        return translate;
    }

    public void setTranslate(String translate) {
        this.translate = translate;
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

    public Dictionary getDictionary() {
        return dictionary;
    }

    public void setDictionary(Dictionary dictionary) {
        this.dictionary = dictionary;
    }

    public Word(long id, String origin, String translate, String originCode, String translateCode, Dictionary dictionary) {
        this.id = id;
        this.origin = origin;
        this.translate = translate;
        this.originCode = originCode;
        this.translateCode = translateCode;
        this.dictionary = dictionary;
    }

    public Word() {
    }
}
