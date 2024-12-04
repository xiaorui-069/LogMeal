package com.stevens.logmeal;

import jakarta.persistence.*;

@Entity
@Table(name = "user_token")
public class UserToken {
    @Id
    private int id;
    @Column(name = "gmail")
    private String email;
    private String username;
    private String token;

    public UserToken() {}
    UserToken(int id, String email, String username, String token) {
        this.email = email;
        this.username = username;
        this.token = token;
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
}
