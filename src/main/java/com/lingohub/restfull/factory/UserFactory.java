package com.lingohub.restfull.factory;

import com.lingohub.restfull.models.User;
import com.lingohub.restfull.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFactory {
    private final UserService userService;

    @Autowired
    public UserFactory(UserService userService) {
        this.userService = userService;
    }


    public void run() {
        User user = new User();
        user.setEmail("user1@mail.com");
        user.setName("User 1");
        user.setPassword("user1");
        userService.addUser(user);

        user = new User();
        user.setEmail("user2@mail.com");
        user.setName("User 2");
        user.setPassword("user2");
        userService.addUser(user);

        user = new User();
        user.setEmail("user3@mail.com");
        user.setName("User 3");
        user.setPassword("user3");
        userService.addUser(user);

        user = new User();
        user.setEmail("user4@mail.com");
        user.setName("User 4");
        user.setPassword("user4");
        userService.addUser(user);

        user = new User();
        user.setEmail("user5@mail.com");
        user.setName("User 5");
        user.setPassword("user5");
        userService.addUser(user);
    }
}
