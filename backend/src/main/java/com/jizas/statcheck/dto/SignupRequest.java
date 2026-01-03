package com.jizas.statcheck.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
    private String phone;
    private String socialMediaFacebook;
    private String socialMediaInstagram;
    private String socialMediaTwitter;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSocialMediaFacebook() {
        return socialMediaFacebook;
    }

    public void setSocialMediaFacebook(String socialMediaFacebook) {
        this.socialMediaFacebook = socialMediaFacebook;
    }

    public String getSocialMediaInstagram() {
        return socialMediaInstagram;
    }

    public void setSocialMediaInstagram(String socialMediaInstagram) {
        this.socialMediaInstagram = socialMediaInstagram;
    }

    public String getSocialMediaTwitter() {
        return socialMediaTwitter;
    }

    public void setSocialMediaTwitter(String socialMediaTwitter) {
        this.socialMediaTwitter = socialMediaTwitter;
    }
}
