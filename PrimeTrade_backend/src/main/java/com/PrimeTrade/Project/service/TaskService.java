package com.PrimeTrade.Project.service;


import com.PrimeTrade.Project.dto.TaskRequestDTO;
import com.PrimeTrade.Project.entity.Task;
import com.PrimeTrade.Project.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j // Lombok annotation to auto-generate the SLF4J Logger
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(TaskRequestDTO request, Long userId) {
        log.info("Attempting to create a new task for User ID: {}", userId);

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        task.setUserId(userId);

        Task savedTask = taskRepository.save(task);
        log.info("Successfully created task with ID: {} for User ID: {}", savedTask.getId(), userId);

        return savedTask;
    }

    public List<Task> getAllTasksForUser(Long userId) {
        log.debug("Fetching all tasks for User ID: {}", userId);
        return taskRepository.findByUserId(userId);
    }

    public Task getTaskById(Long taskId, Long userId) {
        return taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> {
                    // WARN level used for unauthorized access or missing resources
                    log.warn("Unauthorized access attempt or task not found. Task ID: {}, User ID: {}", taskId, userId);
                    return new RuntimeException("Task not found or unauthorized access");
                });
    }

    public Task updateTask(Long taskId, TaskRequestDTO request, Long userId) {
        log.info("Attempting to update task ID: {} for User ID: {}", taskId, userId);

        Task existingTask = getTaskById(taskId, userId);

        existingTask.setTitle(request.getTitle());
        existingTask.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            existingTask.setStatus(request.getStatus());
        }

        Task updatedTask = taskRepository.save(existingTask);
        log.info("Successfully updated task ID: {}", updatedTask.getId());

        return updatedTask;
    }

    public void deleteTaskAsAdmin(Long taskId) {
        log.info("Admin attempting to delete task ID: {}", taskId);

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> {
                    // ERROR level used because an admin action failed
                    log.error("Admin deletion failed. Task not found. Task ID: {}", taskId);
                    return new RuntimeException("Task not found");
                });

        taskRepository.delete(task);
        log.info("Successfully deleted task ID: {}", taskId);
    }
}