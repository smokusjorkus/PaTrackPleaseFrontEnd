PaTrackplease – Local Setup Guide
Overview

PaTrackplease is a full-stack application consisting of:

Frontend (Web / Mobile UI)
Backend (Spring Boot API)
Database (MySQL)
Optional: Dockerized deployment

This guide explains how to run the project locally for development.

1. Prerequisites

Install the following tools:

Java 17+
Node.js (LTS recommended)
MySQL 8+
Maven
(Optional) Docker & Docker Compose
Git
2. Clone the Repository
git clone https://github.com/your-username/PaTrackplease.git
cd PaTrackplease
3. Database Setup (MySQL)
3.1 Create Database

Open MySQL terminal or Workbench:

CREATE DATABASE patrackplease;
3.2 Configure Credentials

Update backend configuration:

src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/patrackplease
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
4. Backend Setup (Spring Boot)
4.1 Run with Maven
cd backend
mvn clean install
mvn spring-boot:run

Backend runs at:

http://localhost:8080
5. Frontend Setup
5.1 Install Dependencies
cd frontend
npm install
5.2 Run Development Server
npm run dev

Frontend runs at:

http://localhost:3000
