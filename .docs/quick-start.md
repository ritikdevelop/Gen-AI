# Quick Start Guide

This guide provides step-by-step instructions to get the Gen-AI web application running on your local machine.

## Prerequisites

*   Node.js (v18 or higher recommended)
*   MongoDB instance (running locally or via MongoDB Atlas)
*   Google Gemini API Key

## 1. Backend Setup

The backend runs on Node.js using Express.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/gen-ai  # Or your MongoDB Atlas URI
    JWT_SECRET=your_super_secret_jwt_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  Start development server:
    ```bash
    npm run dev
    ```
    The server should start on `http://localhost:4000`.

## 2. Frontend Setup

The frontend is built with React and Vite.

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd backend/frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables (Optional):
    If your API is on a matching port, Vite proxy might be configured. Otherwise, set your API base URL if needed.

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The Vite server will typically start on `http://localhost:5173/`. Open this link in your web browser.

## Running Tests

The backend uses Jest and Supertest. To run the test suite:

```bash
cd backend
npm test
```
