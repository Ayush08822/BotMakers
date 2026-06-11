package com.PrimeTrade.Project.controller;


import com.PrimeTrade.Project.dto.TaskRequestDTO;
import com.PrimeTrade.Project.entity.Task;
import com.PrimeTrade.Project.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@Tag(name = "Task Management", description = "CRUD APIs for managing user tasks")
@CrossOrigin(origins = "http://localhost:5173")
@SecurityRequirement(name = "Bearer Authentication") // Tells Swagger this requires a token
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Replace this with how your specific JWT implementation extracts the user ID
    private Long getAuthenticatedUserId() {
        // Example:
        // UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // return userDetails.getId();
        return 1L;
    }

    @PostMapping
    @Operation(summary = "Create a new task", description = "Creates a task linked to the authenticated user.")
    @ApiResponse(responseCode = "201", description = "Task successfully created")
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequestDTO taskRequest) {
        return new ResponseEntity<>(taskService.createTask(taskRequest, getAuthenticatedUserId()), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieves all tasks belonging to the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasksForUser(getAuthenticatedUserId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific task", description = "Retrieves a task by its ID, provided the user owns it.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved task")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id, getAuthenticatedUserId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Update a task", description = "Updates an existing task. User must own the task.")
    @ApiResponse(responseCode = "200", description = "Task successfully updated")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequestDTO taskRequest) {
        return ResponseEntity.ok(taskService.updateTask(id, taskRequest, getAuthenticatedUserId()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a task (Admin Only)", description = "Permanently removes a task. Requires ADMIN privileges.")
    @ApiResponse(responseCode = "204", description = "Task successfully deleted")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTaskAsAdmin(id);
        return ResponseEntity.noContent().build();
    }
}