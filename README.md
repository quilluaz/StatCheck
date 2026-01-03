# StatCheck - Campus Facility Management System

StatCheck is a comprehensive Campus Facility Management System built with a robust Spring Boot backend and a modern React frontend. It goes beyond simple parking management to handle library reservations, academic scheduling, and facility analytics, providing a unified platform for campus resources.

## 🚀 Features

### 🅿️ Parking Management
- **Smart Slot Reservation**: Real-time checking and booking of available parking spots.
- **Lot Management**: Administration of parking lots and specific spaces.

### 📚 Library Services
- **Room Booking**: Reserve specific library rooms for study or meetings.
- **Resource Management**: Track and manage library rooms and assets.

### 📅 Academic Scheduling
- **Subject Management**: Manage academic subjects and courses.
- **Room Schedules**: View and manage schedules for various campus rooms.
- **Conflict Detection**: Prevent double-booking of rooms.

### 📊 Analytics Dashboard
- **Usage Insights**: specific analytics on room usage rates and peak hours.
- **Data-Driven Decisions**: Help administrators optimize facility allocation.

### 🏢 Building Management
- **Campus Integration**: Detailed information and management for specific buildings (GLE, NGE, RTL).

## 🚀 Technology Stack

### Backend
- **Framework:** [Spring Boot 3.2.11](https://spring.io/projects/spring-boot)
- **Language:** Java 21
- **Database:** MySQL
- **Security:** Spring Security & JWT (JSON Web Tokens)
- **ORM:** Spring Data JPA
- **Cloud Storage:** Cloudinary (for image uploads)
- **Build Tool:** Maven

### Frontend
- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Tailwind CSS & Material UI (@mui/material)
- **Icons:** Lucide React, Heroicons, React Icons, Material Icons
- **HTTP Client:** Axios
- **State/Routing:** React Router DOM

## 🛠️ Prerequisites

Before running the application, ensure you have the following installed:

- **Java Development Kit (JDK) 21**
- **Node.js** (v18 or higher recommended)
- **MySQL Server**
- **Git**

## 🏁 Getting Started

### 1. Database Setup

1.  Create a MySQL database named `dbstatcheck`.
    ```sql
    CREATE DATABASE dbstatcheck;
    ```
2.  (Optional) The application assumes a user with username `root` and password `root`. You can configure this in the `application.properties` file later.

### 2. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Configure Environment Variables:
    The application configures itself using `src/main/resources/application.properties`. You can override defaults by setting environment variables or modifying the file directly.

    **Key Environment Variables:**
    | Variable | Default | Description |
    |----------|---------|-------------|
    | `DB_URL` | `jdbc:mysql://localhost:3306/dbstatcheck` | Database Connection URL |
    | `DB_USERNAME` | `root` | Database Username |
    | `DB_PASSWORD` | `root` | Database Password |
    | `JWT_SECRET` | *(Default Provided in properties)* | Secret key for JWT signing |
    | `CLOUDINARY_CLOUD_NAME` | | Cloudinary Cloud Name |
    | `CLOUDINARY_API_KEY` | | Cloudinary API Key |
    | `CLOUDINARY_API_SECRET`| | Cloudinary API Secret |
    | `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Allowed frontend origin |

3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

### 3. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend application will start on `http://localhost:5173` (or the port specified by Vite).

## 📂 Project Structure

```
StatCheck/
├── backend/            # Spring Boot Backend
│   ├── src/
│   ├── mvnw
│   └── pom.xml
├── frontend/           # React Frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md           # Project Documentation
```

## 🔒 Security

The application uses JWT for authentication. Refresh tokens are stored in HTTP-Only cookies for enhanced security.
