# CampusConnect

CampusConnect is a modern web application designed to manage and display campus events. It has been migrated from a legacy EJS backend to a modern React frontend with a decoupled Express API.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router v7, Lucide React, Sonner (Toasts)
- **Backend:** Node.js, Express 5
- **Database:** MongoDB, Mongoose
- **Validation:** Zod (Frontend), Joi (Backend)
- **Data Fetching:** Axios with custom hooks

## Project Structure

- `client/`: Modern React frontend.
  - `src/features/`: Domain-driven feature modules (Events, FAQs).
  - `src/components/layout/`: Shared layout components (Navbar, Footer).
  - `src/lib/`: API client and utility functions.
- `server/`: Express API backend.
  - `server.js`: API entry point with CORS and proxy support.
  - `models/`: Mongoose schemas.
  - `utils/`: Error handling and async wrappers.

## Development Conventions

- **Frontend Architecture:** Use feature-based folders. Logic should live in custom hooks within the feature directory.
- **Styling:** Use Tailwind CSS utility classes. Follow the "Modern SaaS" aesthetic (Slate/Zinc palette with vibrant Primary accents).
- **API Routing:** All backend routes should be prefixed with `/api`.
- **Express 5 Wildcards:** Wildcard routes must use named parameters (e.g., `app.all("*path", ...)`).
- **Verification:** Always run `npm run build` in the `client` directory to verify frontend changes before completion.

## Getting Started

### Prerequisites

- Node.js & MongoDB

### Installation

1. Install backend dependencies: `cd server && npm install`
2. Install frontend dependencies: `cd client && npm install`

### Running the Application

1. Start the Backend (Port 3000): `cd server && node server.js`
2. Start the Frontend (Port 5173): `cd client && npm run dev`
