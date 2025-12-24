# LearnToCode | Minimalist C++ Learning Console

LearnToCode is a premium, monochrome educational platform designed to master C++ logic through a structured, architectural path. Inspired by Apple's minimalist aesthetic, the application prioritizes cognitive clarity and technical focus.

![License](https://img.shields.io/badge/license-MIT-black)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Architectural Roadmap**: 6 comprehensive units covering everything from Foundations to Template Metaprogramming.
- **Monochrome Design**: High-end minimalist UI built with Tailwind v4 and Josefin Sans.
- **Logical Simulator**: Interactive quiz engine with real-time logical validation.
- **Progress Tracking**: XP and Streak systems to maintain learning momentum.
- **SRS Foundation**: Spaced Repetition System logic integrated for mastery tracking.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Framer Motion, Lucide React, Tailwind CSS v4.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Authentication.
- **Design**: Monochrome aesthetic, Apple-inspired transitions.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd LearnToCode
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/learntocode
   JWT_SECRET=your_secret_key
   ```
   Seed the curriculum:
   ```bash
   npm run seed
   ```
   Start the server:
   ```bash
   npm run start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📂 Project Structure

- `/frontend`: React application with the minimalist design system.
- `/backend`: Express API and database models.
- `/backend/data/courseData.js`: Central source of truth for the curriculum.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with logic and precision.*
