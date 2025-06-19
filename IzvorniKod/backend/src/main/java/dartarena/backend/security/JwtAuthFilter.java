package dartarena.backend.security;

import dartarena.backend.security.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtProvider;

    public JwtAuthFilter(JwtTokenProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Nema tokena ili format nije dobar -> pusti dalje (može biti ruta sa permitAll)
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);  // "Bearer " -> substring nakon 7 znakova

        // Validacija
        if (jwtProvider.validateToken(token)) {
            // Ako je token ispravan, dohvati email i userId
            String email = jwtProvider.getEmailFromToken(token);
            Long userId = jwtProvider.getUserIdFromToken(token);

            // U ovom jednostavnom slučaju, setiramo auth u SecurityContext
            var authToken = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    Collections.emptyList()
            );

            // Stavi authentication u kontekst
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // nastavi lanac filtera
        filterChain.doFilter(request, response);
    }
}
