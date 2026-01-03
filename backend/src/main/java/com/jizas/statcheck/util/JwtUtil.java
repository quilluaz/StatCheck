package com.jizas.statcheck.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    @Value("${jwt.refresh-expiration}")
    private long REFRESH_EXPIRATION_TIME;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public JwtUtil(@Value("${jwt.secret}") String secretString) {
        Key key = null;
        try {
            // Try decoding as standard Base64 first
            byte[] keyBytes = Decoders.BASE64.decode(secretString);
            key = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e1) {
            try {
                 // Try URL-safe Base64
                 byte[] keyBytes = java.util.Base64.getUrlDecoder().decode(secretString);
                 key = Keys.hmacShaKeyFor(keyBytes);
            } catch (Exception e2) {
                 // Fallback to raw ISO-8859-1 bytes (most compatible for existing plain text secrets)
                 // or UTF-8 if preferred, but existing non-base64 secrets might just use raw bytes logic
                 key = Keys.hmacShaKeyFor(secretString.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            }
        }
        this.SECRET_KEY = key;
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            logger.debug("Validating token: " + token.substring(0, 20) + "...");
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            logger.debug("Token validation successful");
            return true;
        } catch (Exception e) {
            logger.error("Token validation failed", e);
            return false;
        }
    }

    public String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("role", String.class);
    }

    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public long getExpirationTime() {
        return EXPIRATION_TIME;
    }

    public long getRefreshExpirationTime() {
        return REFRESH_EXPIRATION_TIME;
    }
}