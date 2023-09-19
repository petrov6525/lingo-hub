package com.lingohub.restfull.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Logo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;
    private String path;
    private String name;

    public Logo(long id, String path, String name) {
        this.id = id;
        this.path = path;
        this.name = name;
    }

    public Logo() {

    }

    @Override
    public String
    toString() {
        return "Logo{" +
                "id=" + id +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
