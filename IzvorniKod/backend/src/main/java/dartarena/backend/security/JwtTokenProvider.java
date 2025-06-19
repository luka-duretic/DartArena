package dartarena.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    // Tajni ključ (stavis ga u env od IDEA, .env ili .properties)
    @Value("${spring.jwt.secret}")
    private String SECRET;

    public String generateToken(String email, Long userId) {
        long now = System.currentTimeMillis();
        long expire = now + 1000L * 60 * 60 * 12; // 12h

        return Jwts.builder()
                .setSubject(email)                // spremaju se email i id u token
                .claim("id", userId)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(expire))
                .signWith(getSignKey())
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Long getUserIdFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build()
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }
}

