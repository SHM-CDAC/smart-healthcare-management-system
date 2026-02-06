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

- Spring Security for authentication and role-based authorization  
- Password encryption for secure login  
- Aspect-Oriented Programming (AOP) for cross-cutting concerns  
- Global exception handling using `@ControllerAdvice`  
- Transaction management using `@Transactional`  
- Layered architecture:  
  **Controller → Service → Repository → Database**

---

## 👥 User Roles & Functionalities

---

### 👨‍💼 Admin
- Login  
- Verify doctors  
- View list of doctors registered on the platform  
- View appointments booked by patients per doctor  
- Remove doctor  
- View list of registered patients  
- Remove patient  
- Review application feedbacks  

---

### 🧑‍🦱 Patient
- Register  
- Login  
- Update profile  
- Search doctors by city  
- View list of doctors  
- Book appointment  
- Make payment  
- Cancel appointment  
- View appointment history  
- Give review for doctor  
- Write application feedback  
- Delete account  

---

### 🧑‍⚕ Doctor
- Register  
- Login  
- Update profile  
- Create time slots  
- View available slots  
- Remove slot  
- Approve appointments  
- View patient bookings  
- View earnings  
- Write feedback  
- Delete account  

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
- Online appointment booking system  
- Doctor availability and slot management  
- Optimized database queries using indexing  
- Activity logging using database triggers  
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

Clone the repository:
   ```bash
   git clone https://github.com/SHM-CDAC/smart-healthcare-management-system.git
