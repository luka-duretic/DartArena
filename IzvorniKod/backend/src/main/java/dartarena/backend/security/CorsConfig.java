package dartarena.backend.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Globalni CORS config
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // vrijedi za sve putanje
                .allowedOrigins("http://localhost:3000", "http://dartarena.onrender.com") // prilagodi front-end domain/port
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type") // Ako trebaš dopustiti sve headere
                .allowCredentials(true); // Ako koristiš "withCredentials" u JS
    }
}
