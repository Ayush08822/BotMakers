# Full-Stack Role-Based Access Control (RBAC) Authentication System
A secure, full-stack authentication system featuring Spring Boot (Backend) and React (Frontend). This project implements Role-Based Access Control (RBAC) using JSON Web Tokens (JWT), allowing secure endpoint management for public users, authenticated users, and administrators.

🚀 Features
State-of-the-Art Backend: Built with Spring Boot 3, Spring Security 6, and Hibernate/JPA.

Robust Frontend Architecture: Dynamic layout rendering using React, TypeScript, Tailwind CSS, and Zustand for state management.

Secure Authentication Workflow: Custom JWT authentication filters with auto-attaching request interceptors via Axios.

Database Management: Configured with an embedded H2 database console for development tracking.

# Prerequisites
Java Development Kit (JDK): Version 25 (Required for compilation)

Maven 3.8+ (or use the provided ./mvnw wrapper)

# Step-by-Step Configuration
1. Navigate to the backend directory: cd BotMakers_backend
2. Verify your local Java runtime matches compilation requirements: java -version
# Must return java version "23" or higher to avoid LinkageError (69.0 mismatch)
3. Clean build and compile the application: ./mvnw clean compile
4. Run the Spring Boot Application: ./mvnw spring-boot:run

The backend server will spin up on http://localhost:8080.

# Development Database Access
You can access the H2 database console to view user schema and registrations:
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb (or check your application.properties)
Username: sa | Password: (Leave blank)

💻 Frontend Setup (React + Vite)
Prerequisites
Node.js: v18 or higher
npm or yarn

# Step-by-Step Configuration
1. Navigate to the frontend directory: cd ../BotMakers_frontend
2. Install project dependencies: npm install
3. Launch the local development environment: npm run dev

The web portal will launch locally on http://localhost:3000 (or localhost:5173).
