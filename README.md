# AI-ENHANCED EVENT AGGREGATION AND RECOMMENDATION PORTAL (CAMPUS CONNECT)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![Academic Year](https://img.shields.io/badge/Academic_Year-2025--26-green?style=for-the-badge)
![Institution](https://img.shields.io/badge/Institution-Greater_Noida_Institute_of_Technology_(IPU)-maroon?style=for-the-badge)

A centralized, scalable web application designed to bridge the gap between students and campus activities, fostering a more engaged academic community.

---

## 🎓 Academic Details

This project is submitted in partial fulfillment of the requirements for the B.Tech degree.

*   **Academic Year:** 2025-2026
*   **Institution:** Greater Noida Institute of Technology (IPU)
*   **Project Guide:** Md. Shahrookh Husain (Assistant Professor)
*   **Team Members:**
    *   Sachin (Team-Leader)
    *   Richa Chaudhary
    *   Ayush Sareen

---

## 📝 Project Overview

### Short Description
Campus Connect is a modern, decoupled web platform that centralizes campus event discovery, management, and engagement. It provides students with a unified portal to explore activities while offering administrators a robust dashboard for seamless event curation and analytics.

### Problem Statement
In large academic institutions, students often miss out on valuable extracurricular activities, workshops, and seminars due to fragmented communication channels (e.g., disparate WhatsApp groups, notice boards, and emails). Similarly, event organizers lack a centralized platform to efficiently promote events, track engagement, and gather student inquiries, leading to lower participation and logistical inefficiencies.

### Objective
1.  **Centralized Discovery:** To provide a single, accessible portal for students to discover all campus events.
2.  **Streamlined Management:** To equip administrators with a comprehensive dashboard for creating, updating, and monitoring events.
3.  **Enhanced Engagement:** To implement interactive features, such as an event-specific FAQ system, allowing direct communication between students and organizers.
4.  **Modern Architecture:** To build a scalable, secure system utilizing modern web technologies (MERN stack) transitioning from legacy server-rendered architectures.

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **Framework:** React 19 (via Vite)
*   **Routing:** React Router v7
*   **State Management:** React Context API
*   **Styling:** Tailwind CSS (Modern SaaS UI with Slate/Zinc palettes)
*   **Icons & Notifications:** Lucide React, Sonner
*   **Validation:** Zod

### Backend (Server)
*   **Runtime:** Node.js
*   **Framework:** Express 5
*   **Validation:** Joi
*   **Security:** Helmet.js, Express-rate-limit, Custom NoSQL Injection Sanitizer

### Database & Authentication
*   **Database:** MongoDB (Local) with Mongoose ODM
*   **Authentication:** Dual-layer JSON Web Tokens (JWT) ensuring complete isolation between User and Admin sessions.

---

## ✨ Features

### User Features
*   **Event Feed:** Browse a chronologically sorted feed of upcoming campus events.
*   **Detailed Views:** Access comprehensive event details, including tags, types, and descriptions.
*   **Interactive FAQs:** Ask questions directly on event pages; authors can manage their own inquiries.
*   **Similar Events:** Intelligent recommendations for related events based on categorization and tags.

### Admin & Management Features
*   **Analytics Dashboard:** Real-time statistics tracking total events, registered users, active admins, and pending FAQs.
*   **Event CRUD:** Full control to Create, Read, Update, and Delete events.
*   **Super-Admin Portal:** Exclusive capability to onboard new administrative staff.

### Security & Architecture Features
*   **Role-Based Access Control (RBAC):** Strict permission checks differentiating `user`, `admin`, and `super-admin`.
*   **Isolated Authentication:** Separate JWT secrets for users and admins prevent privilege escalation.
*   **API Protection:** Rate limiting prevents abuse, while Helmet.js secures HTTP headers.
*   **Data Integrity:** Dual validation (Zod on client, Joi on server) ensures only clean data enters the database.

---

## 🏗️ System Architecture

### High-Level Architecture
The application follows a decoupled Client-Server architecture. The React frontend operates independently, communicating with the Express backend exclusively via RESTful JSON APIs.

### Folder Structure
```text
CampusConnect/
├── client/                 # React 19 Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Layout, Navbar)
│   │   ├── features/       # Domain-driven modules (Auth, Events)
│   │   ├── lib/            # API clients and utilities
│   │   └── pages/          # Route components
│   └── package.json
└── server/                 # Express 5 Backend
    ├── middleware/         # Auth and Error handling
    ├── models/             # Mongoose Schemas (User, Admin, Event, FAQ)
    ├── routes/             # API Endpoints
    ├── seeders/            # Database initialization scripts
    └── server.js           # Entry point
```

---

## 🚀 Installation & Setup Guide

Follow these steps to run the project locally.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local instance running on default port `27017`)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd CampusConnect
```

### 2. Backend Setup
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file (see Environment Variables section below)
touch .env

# Start the server (runs on port 3000)
node server.js
```
*Note: Upon starting the server for the first time, the `superAdmin.js` seeder will automatically create the initial Super-Admin account based on your `.env` variables.*

### 3. Frontend Setup
Open a new terminal window:
```bash
# Navigate to the client directory from the project root
cd client

# Install dependencies
npm install

# Start the Vite development server (runs on port 5173)
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory with the following configuration:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/CampusConnect

# JWT Secrets (MUST BE DIFFERENT)
JWT_USER_SECRET=your_super_secret_user_key_here
JWT_ADMIN_SECRET=your_super_secret_admin_key_here

# Initial Super-Admin Seeding Credentials
SUPER_ADMIN_NAME="Super Admin"
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=StrongPassword123
```

---

## 📝 API Endpoints Overview

*   `POST /api/users/register` - Register a new student user
*   `POST /api/users/login` - Authenticate a student
*   `POST /api/admin/login` - Authenticate an admin
*   `GET /api/events` - Fetch all events
*   `POST /api/events` - Create a new event (Admin only)
*   `POST /api/events/:id/faqs` - Ask a question regarding an event (Logged in users)
*   `GET /api/stats` - Fetch dashboard analytics (Admin only)

---
*Developed with ❤️ by the Campus Connect Team.*
