# Jatra MERN App
-> ALL IN ONE EVENT MANAGEMENT PLATFORM

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed for managing and showcasing events, specifically focusing on "Jatra" (festivals/events).

## Features

* **User Authentication:**
    * [x] Login
    * [x] Register
* **Event Management:**
    * [ ] Event Add
    * [ ] Event Delete
    * [x] Event View

## Tech Stack

* **Frontend:**
    * React.js
    * React Router
    * Axios (for API requests)
    * (Optional: UI Libraries like Material-UI, Chakra UI, Tailwind CSS, etc.)
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB (with Mongoose ODM)
    * JSON Web Tokens (JWT) for authentication
    * (Optional: dotenv for environment variables)
* **Database:**
    * MongoDB

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd jatra-mern-app
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables:**

    * Create a `.env` file in the `backend` directory.
    * Add the following variables:

        ```
        PORT=5000 # Or any port you prefer
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_secret_key_for_jwt>
        ```

    * Replace `<your_mongodb_connection_string>` and `<your_secret_key_for_jwt>` with your actual values.

5.  **Run the backend server:**

    ```bash
    cd ../backend
    npm run dev #or npm start
    ```

6.  **Run the frontend application:**

    ```bash
    cd ../frontend
    npm start
    ```

7.  **Open your browser and navigate to `http://localhost:3000`.**

## Project Structure