package com.stevens.logmeal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class RestEndpointController {

    @Value("${my-api-key}")
    private String key;

    private final RestTemplate restTemplate;
    private final UserTokenRepository userTokenRepository;
    RestEndpointController(UserTokenRepository userTokenRepository, RestTemplate restTemplate) {
        this.userTokenRepository = userTokenRepository;
        this.restTemplate = restTemplate;
    }

    @GetMapping("/getToken")
    public ResponseEntity<String> getToken(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Optional<UserToken> userToken = getUserToken(email);
        return userToken.map(token -> ResponseEntity.ok(token.getToken())).orElseGet(() -> ResponseEntity.ok(signUpToApiClient(email)));
    }

    String signUpToApiClient(String username) {
        String url = "https://api.logmeal.com/v2/users/signUp";
        Map<String, Object> body = new HashMap<>();
        body.put("username", username);
        ResponseEntity<Map> response = fetchDataFromAPI(url, key, body, HttpMethod.POST);
        String user_token = response.getBody().get("token").toString();
        int id = (int) response.getBody().get("id");
        update(new UserToken(id, username, username, user_token));
        return user_token;
    }

    Optional<UserToken> getUserToken(String email) {
        return userTokenRepository.findByEmail(email);
    }

    void update(UserToken userToken) {
        userTokenRepository.save(userToken);
    }

    ResponseEntity<Map> fetchDataFromAPI(String url, String token, Map<String, Object> body, HttpMethod method) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, method, entity, Map.class);
    }
}
