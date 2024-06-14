package me.leehyeongcheol.video_player;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model){

        model.addAttribute("message", "Video Player Test");

        return "index";
    }
}