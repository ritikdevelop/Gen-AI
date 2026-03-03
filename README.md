# Gen-AI Backend

A Node.js Express backend with MongoDB authentication system.

## Features

- User registration with password hashing (bcryptjs)
- User login with JWT token authentication
- Cookie-based token storage
- MongoDB database integration with Mongoose

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud instance)

## Installation

```bash
# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
PORT=4000
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests with Jest

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Request/Response Formats

#### Register User
**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

#### Login User
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js  # Auth logic
│   ├── models/
│   │   └── user.model.js  # User schema
│   ├── routes/
│   │   └── auth.route.js  # Auth routes
│   └── app.js             # Express app
├── server.js              # Entry point
├── package.json
├── Dockerfile
└── docker-compose.yml
```

## License

ISC

