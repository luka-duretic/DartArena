package dartarena.backend.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping("/{name}")
    public String hello(
            @PathVariable("name") String name,
            @RequestParam(value="surname", defaultValue = "") String surname
    ) {
        return "Helloo " + name + " " + surname + " lets improve your darts!!!";
    }
}
