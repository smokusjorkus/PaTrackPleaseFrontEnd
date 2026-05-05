📍 PaTrackplease – Local Setup Guide
📖 Overview

PaTrackplease is a full-stack application consisting of:

🌐 Frontend (Web / Mobile UI)
⚙️ Backend (Spring Boot API)
🗄️ Database (MySQL)
🐳 Optional: Dockerized deployment

This guide explains how to set up and run the project locally for development.
-
🧰 1. Prerequisites

Before running the project, install the following:

☕ Java 17+
🟢 Node.js (LTS recommended)
🐬 MySQL 8+
📦 Maven
🐳 (Optional) Docker & Docker Compose
🔧 Git
📥 2. Clone the Repository
git clone https://github.com/your-username/PaTrackplease.git
cd PaTrackplease
🗄️ 3. Database Setup (MySQL)
-
3.1 Create Database
Open MySQL terminal or Workbench:

CREATE DATABASE patrackplease;
-
3.2 Configure Credentials

Update the backend configuration file:

src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/patrackplease
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
-
⚙️ 4. Backend Setup (Spring Boot)
4.1 Run with Maven
cd backend
mvn clean install
mvn spring-boot:run
🚀 Backend will run at:
http://localhost:8080
-
💻 5. Frontend Setup
5.1 Install Dependencies
cd frontend
npm install
5.2 Run Development Server
npm run dev
🌐 Frontend will run at:
http://localhost:3000
-
🔗 6. API Connection (Frontend → Backend)

Ensure your frontend points to the correct backend URL:

const BASE_URL = "http://localhost:8080";

If using Android Emulator:

http://10.0.2.2:8080
-
🧪 7. Common Issues
❌ MySQL Connection Error
Ensure MySQL is running
Check username/password
Confirm database exists
❌ Port Already in Use

Change backend port:

server.port=8081
❌ CORS Error

Enable in backend:

@CrossOrigin(origins = "http://localhost:3000")
-
📁 8. Project Structure
PaTrackplease/
│
├── backend/        # Spring Boot API
├── frontend/       # Web UI
├── database/       # SQL scripts (optional)
└── docker/         # Docker configs (optional)

Start backend before frontend
Keep API URLs consistent across environments
Do not expose database credentials in public repos
