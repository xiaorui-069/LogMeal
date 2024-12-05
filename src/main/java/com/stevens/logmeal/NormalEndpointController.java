package com.stevens.logmeal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class NormalEndpointController {

    @Autowired
    RestEndpointController restEndpointController;

    @GetMapping("/getToken")
    public String getToken(@AuthenticationPrincipal OAuth2User principal, Model model) {
        String email = principal.getAttribute("email");
        Optional<UserToken> userToken = restEndpointController.getUserToken(email);
        String token = userToken.isEmpty()? restEndpointController.signUpToApiClient(email): userToken.get().getToken();
        model.addAttribute("token", token);
        return "callback";
    }
}
