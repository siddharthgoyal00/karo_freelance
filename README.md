# Karo Freelance

Karo Freelance is a premium freelance platform built to connect elite university students with startup clients. It enables startups to rapidly innovate by hiring verified, high-quality student talent without traditional agency markups.

## Tech Stack

### Frontend
- **Framework:** React with TypeScript (via Vite)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand, React Query (TanStack Query)
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form + Zod

### Backend
- **Framework:** Spring Boot (Java)
- **Database Migrations:** Flyway
- **Authentication:** JWT (JSON Web Tokens) with Spring Security
- **Build Tool:** Maven

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17+
- Maven

### Running the Backend
1. Navigate to the `backend/` directory.
2. Ensure your local database is running and the configuration in `src/main/resources/application.yml` is accurate.
3. Start the backend API by running:
   ```bash
   mvn spring-boot:run
   ```

### Running the Frontend
1. Navigate to the `frontend/` directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Brand & Aesthetic
The platform utilizes a dynamic dark mode UI characterized by a strict **red, black, and dark-grey** palette. The user interface features premium glassmorphism effects, responsive micro-animations, and abstract red glows to give a distinctly modern and high-tech brand feel.
