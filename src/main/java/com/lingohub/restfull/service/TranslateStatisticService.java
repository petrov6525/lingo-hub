package com.lingohub.restfull.service;

import com.lingohub.restfull.models.LanguageCode;
import com.lingohub.restfull.models.TranslateStatistic;
import com.lingohub.restfull.models.User;
import com.lingohub.restfull.models.Word;
import com.lingohub.restfull.repo.TranslateStatisticRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TranslateStatisticService {
    private final TranslateStatisticRepository translateStatisticRepository;
    private final UserService userService;
    private final LanguageCodeService languageCodeService;

    @Autowired
    public TranslateStatisticService(TranslateStatisticRepository translateStatisticRepository, UserService userService, LanguageCodeService languageCodeService) {
        this.translateStatisticRepository = translateStatisticRepository;
        this.userService = userService;
        this.languageCodeService = languageCodeService;
    }

    public Word add(Word word, HttpServletRequest request) {
        int userId = request.getIntHeader("uuid");
        String originCode = word.getOriginCode();
        String translateCode = word.getTranslateCode();

        addWithCode(userId, originCode);
        addWithCode(userId, translateCode);

        return word;
    }

    private void addWithCode(int userId, String code) {
        User user = userService.findUserById(userId);
        LanguageCode languageCode = languageCodeService.findByCode(code);
        TranslateStatistic translateStatistic = translateStatisticRepository.findByLanguageCodeAndUser(
                languageCode, user
        );
        if (translateStatistic == null) {
            translateStatistic = new TranslateStatistic();
            translateStatistic.setLanguageCode(languageCode);
            translateStatistic.setUser(user);
            translateStatistic.setCount(1);
            translateStatisticRepository.save(translateStatistic);
        }
        else {
            translateStatistic.setCount(translateStatistic.getCount()+1);
            translateStatisticRepository.save(translateStatistic);
        }
    }

    public List<TranslateStatistic> findAllByUserId(int userId) {
        final int limit = 5;
        List<TranslateStatistic> sortedList = translateStatisticRepository.findAllByUserIdOrderByCountDesc(userId);
        if (sortedList.size() > limit) {
            return sortedList.subList(0, limit);
        }
        return sortedList;
    }
}
