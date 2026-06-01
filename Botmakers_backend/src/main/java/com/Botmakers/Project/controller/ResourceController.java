package com.Botmakers.Project.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Tag(name = "Resources", description = "Protected endpoints demonstrating RBAC access control")
public class ResourceController {

    // ── A: Public — no token needed ───────────────────────────────────────────

    @Operation(summary = "Public endpoint", description = "Accessible by everyone — no token required.")
    @ApiResponse(responseCode = "200", description = "OK")
    @GetMapping("/api/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of(
                "endpoint", "/api/public",
                "access", "ALL",
                "message", "This endpoint is accessible by everyone."
        ));
    }

    // ── U: USER or ADMIN ──────────────────────────────────────────────────────

    @Operation(
            summary     = "User endpoint",
            description = "Accessible by USER and ADMIN roles. Requires a valid Bearer token.",
            security    = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Authorized"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid token",    content = @Content),
            @ApiResponse(responseCode = "403", description = "Insufficient role",           content = @Content)
    })
    @GetMapping("/api/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> userEndpoint(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(Map.of(
                "endpoint", "/api/user",
                "access", "USER / ADMIN",
                "message", "Welcome, " + principal.getUsername() + "! User-level content."
        ));
    }

    // ── A: ADMIN only ─────────────────────────────────────────────────────────

    @Operation(
            summary     = "Admin endpoint",
            description = "Accessible by ADMIN role only. Requires a valid Bearer token with ADMIN role.",
            security    = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Authorized"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid token",    content = @Content),
            @ApiResponse(responseCode = "403", description = "Insufficient role",           content = @Content)
    })
    @GetMapping("/api/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> adminEndpoint(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(Map.of(
                "endpoint", "/api/admin",
                "access", "ADMIN only",
                "message", "Welcome, " + principal.getUsername() + "! Admin-level content."
        ));
    }
}
