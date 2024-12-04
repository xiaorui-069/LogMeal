package com.stevens.logmeal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface UserTokenRepository extends JpaRepository<UserToken, Integer> {

    @Query("select ut from UserToken ut where ut.email = ?1")
    Optional<UserToken> findByEmail(String user_email);
}
