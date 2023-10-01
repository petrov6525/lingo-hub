package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.LanguageCode;
import com.lingohub.restfull.models.TranslateStatistic;
import com.lingohub.restfull.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranslateStatisticRepository extends JpaRepository<TranslateStatistic, Integer> {
    TranslateStatistic findByLanguageCodeAndUser(LanguageCode code, User user);

    List<TranslateStatistic> findAllByUserIdOrderByCountDesc(int userId);
}
