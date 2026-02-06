# 🏥 Smart Healthcare Management System

Smart Healthcare Management System is a web-based application that helps patients find nearby doctors, check real-time availability, and book appointments online, reducing waiting time and unnecessary clinic visits.

---

## 📌 Project Overview

This project is developed using **Java, Spring Boot, React, and MySQL** as part of the **CDAC PG-DAC curriculum**.  
It provides a secure and scalable healthcare appointment management platform with **role-based access control** for **Admin, Doctor, and Patient**.

---

## 🛠 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- Hibernate / JPA
- REST APIs

### Frontend
- React
- HTML, CSS, JavaScript
- Axios

### Database
- MySQL
- Database Indexing
- Database Triggers

---

## 🔐 Security & Architecture

- **Spring Security** for authentication and role-based authorization
- Password encryption for secure login
- **Aspect-Oriented Programming (AOP)** for cross-cutting concerns
- Global exception handling using `@ControllerAdvice`
- Transaction management using `@Transactional`
- Layered architecture:
  - Controller → Service → Repository → Database

---

## 👥 User Roles & Functionalities

### 👨‍💼 Admin
1.Login
2.Verify Doctors
3.View List of Doctors Registered on Website
4.View Appointments booked by patients per Doctor
5.Remove Doctor 
6.View List of Patients Registered on Website   
7.Remove Patient               
8.Review Application Feedbacks

---

### 🧑‍🦱 Patient
1.Register
2.Login
3.Update Profile
4.Search by city 
5.View List of Doctors      
6.Book Appointment                                     
7.Make Payment                    
8.Cancel Appointment
9.Appointment History
10.Review for Doctor
11.Write Application Feedback 
12.Delete Account

---

### 🧑‍⚕ Doctor
1.Register 
2.Login
3.Update Profile 
4.Create Slot
5.View Slots
6.Remove Slot
7.Approve Appointments***
8.View Patient Bookings
9.View Earnings
10.Write Feedbacks
11.Delete Account

---

## 🗄 Database Design

- Normalized database schema
- Indexed frequently searched columns (e.g., `city`, `doctor_id`)
- Database triggers to log:
  - Appointment booking
  - Appointment cancellation
  - User activity

---

## 🚀 Key Features

- Secure role-based access
- Online appointment booking
- Doctor availability management
- Optimized database queries using indexing
- Activity logging using triggers
- Scalable and maintainable backend design

---

## ⚙️ Project Setup & Installation

---

## 🔧 Backend Setup (Spring Boot)

### Prerequisites
- Java 8 or higher
- Maven
- MySQL
- IDE (STS / IntelliJ / Eclipse)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SHM-CDAC/smart-healthcare-management-system.git
   
2. Open the backend project in your IDE (STS recommended).

3. Create MySQL database:

CREATE DATABASE smart_healthcare_db;


4. Configure database in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/smart_healthcare_db
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect


5. Build the project:

6. Run the Spring Boot application:

7. Backend server will start at:

http://localhost:8080

🎨 Frontend Setup (React)
Prerequisites

Node.js

npm

Steps

1. Navigate to frontend directory:

cd frontend

2. Install required dependencies:

npm install

3. Start the React application:

npm run dev

4. Frontend application will run at:

http://localhost:3000

🔗 Frontend–Backend Integration

Frontend communicates with backend using REST APIs

Axios is used for HTTP requests

Authentication token is passed in request headers for secured APIs

