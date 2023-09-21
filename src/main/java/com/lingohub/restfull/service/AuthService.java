package com.lingohub.restfull.service;

import com.lingohub.restfull.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final String TOKEN = "sirh545dff4e5f4ffkfjhe";
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public User logIn (User user) {
        User authUser = userService.findUserByEmail(user.getEmail());
        if (authUser != null) {
            if (authUser.getPassword().equals(user.getPassword())) {
                authUser.setToken(this.TOKEN);
                return userService.updateUser(authUser);
            }
        }
        return null;
    }

    public User logOut (User user) {
        user.setToken(null);
        return userService.updateUser(user);
    }

    public boolean checkAuth(HttpServletRequest request) {
        String token = request.getHeader("auth-token");
        if (token == null){
            return false;
        }
        if (token.equals(this.TOKEN)) {
            return true;
        }
        return false;
    }

    public ResponseEntity<?> createUnauthorizedResponse() {
        return new ResponseEntity<>("unauthorized user", HttpStatus.UNAUTHORIZED);
    }
}
