**Habit Tracker** <br>
Welcome to Habit Tracker!
This application is designed to help users build and maintain habits through tracking, streaks, and interactive calendars. Built with the MERN Stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS, this project provides a seamless and engaging user experience.

**Features**

User Authentication:
Sign Up, Log In, and Log Out functionality with JWT authentication.
Securely store user data.
Habit Management:

Add, update, and delete habits.
Track progress via interactive calendars.
Set frequency for specific days of the week.
Habit Tracking:

Log daily habit completions.
View streaks and completion statistics.
Interactive UI:

Modern and responsive design using Tailwind CSS.
Dashboard with habit cards, completion stats, and progress calendars.

**Prerequisites**
Before you begin, ensure you have the following installed on your machine:

Node.js (v16 or later)
Download Node.js

MongoDB
Local MongoDB installation or a MongoDB Atlas account.
Download MongoDB
Sign up for MongoDB Atlas

Git (optional)
Download Git

**Getting Started**
Follow these steps to set up and run the project locally:

**1. Clone the Repository**
bash
Copy code
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
**2. Set Up the Backend**
Navigate to the backend directory and install dependencies:

bash
Copy code
cd backend
npm install
Create a .env file in the backend directory with the following variables:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
Replace <username>, <password>, and <database> with your MongoDB credentials.

Run the backend server:

bash
Copy code
npm run dev
The backend server should now be running at http://localhost:5000.

**3. Set Up the Frontend**
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd ../frontend
npm install

Start the frontend development server:

bash
Copy code
npm run dev
The frontend should now be running at **http://localhost:5173**

**Project Structure**
Backend (/backend)
Technologies: Node.js, Express.js, MongoDB, JWT.
Key Files:
server.js: Entry point for the backend server.
routes/Habit.js: Handles habit-related API routes.
models/Habit.js: MongoDB schema for habits.
models/Log.js: MongoDB schema for habit logs.
Frontend (/frontend)
Technologies: React, Vite, Tailwind CSS.
**Key Files:**
src/components/Auth: Handles login, signup, and authentication.
src/components/Dashboard: Main dashboard for managing habits.
src/components/Habit: Habit-related components like HabitList and HabitStats.
src/services/api.js: API service for making requests to the backend.

**Running the Project Locally**

Start the Backend:
Ensure MongoDB is running locally or Atlas credentials are correctly set.
Run npm run dev in the backend directory.

Start the Frontend:
Run npm run dev in the frontend directory.
Open http://localhost:5173 in your browser to view the app.

**API Documentation**
Base URL
http://localhost:5000/api

**Endpoints
Authentication**
POST /auth/register: Register a new user.
POST /auth/login: Log in and receive a JWT token.
Habits
GET /habits: Fetch all habits for the logged-in user.
POST /habits: Create a new habit.
PATCH /habits/:id: Update an existing habit.
DELETE /habits/:id: Delete a habit.
PUT /habits/:id/mark-complete: Mark a habit as completed.
GET /habits/:id/stats: Get streak and completion stats for a habit.
