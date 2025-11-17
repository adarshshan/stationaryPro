# Shop Application

This repository contains a full-stack e-commerce application with a React frontend and a Node.js/Express backend.

## Project Structure

- `frontend/`: Contains the React application for the user interface.
- `backend/`: Contains the Node.js/Express application for the API.

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Backend Setup

Follow these steps to set up and run the backend:

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the `backend/` directory, create a file named `.env` and add your JWT secret key.
    ```
    JWT_SECRET=your_super_secret_jwt_key
    ```
    Replace `your_super_secret_jwt_key` with a strong, unique secret.

4.  **Run the backend in development mode:**
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:3001`.

## Frontend Setup

Follow these steps to set up and run the frontend:

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend in development mode:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the frontend and backend are running:

-   **Login:** Navigate to the login page. Use any mobile number and `123456` as the OTP to log in.
-   **Product Listing:** Browse products on the homepage.
-   **Add to Cart:** Add products to your shopping cart.
-   **Checkout:** Proceed to checkout to place an order.
-   **Admin Dashboard:** Access the admin dashboard (requires login).

---
**Note:** This application uses `sweetalert2` for enhanced popup modals and `axios` for API requests with JWT authentication.