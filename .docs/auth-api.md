# Authentication API Documentation

This document describes the authentication endpoints available in the application.

Base Path: `/api/auth`

---

## 1. Register User

Register a new user account. Set an HTTP-only cookie with the authentication token upon success.

**Endpoint:** `POST /register`
**Access:** Public

### Request Body (JSON)

| Field | Type | Description |
| :--- | :--- | :--- |
| `username` | string | The chosen username. |
| `email` | string | The user's email address. |
| `password` | string | The user's password. |

### Responses

- **201 Created**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user-id",
      "username": "chosen-username",
      "email": "user@example.com"
    }
  }
  ```

- **400 Bad Request** (Missing fields)
  ```json
  {
    "message": "Please provide username, email and password"
  }
  ```

- **400 Bad Request** (Account already exists)
  ```json
  {
    "message": "Account already exists with this email address or username"
  }
  ```

---

## 2. Login User

Authenticate an existing user. Set an HTTP-only cookie with the authentication token upon success.

**Endpoint:** `POST /login`
**Access:** Public

### Request Body (JSON)

| Field | Type | Description |
| :--- | :--- | :--- |
| `email` | string | The user's email address. |
| `password` | string | The user's password. |

### Responses

- **200 OK**
  ```json
  {
    "message": "User loggedIn successfully.",
    "user": {
      "id": "user-id",
      "username": "user-username",
      "email": "user@example.com"
    }
  }
  ```

- **400 Bad Request** (Invalid credentials)
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## 3. Logout User

Logs out the current user by clearing the authentication token cookie and blacklisting the previous token.

**Endpoint:** `GET /logout`
**Access:** Public

### Responses

- **200 OK**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

---

## 4. Get Current User (Get-Me)

Retrieve details of the currently logged-in user.

**Endpoint:** `GET /get-me`
**Access:** Private (Requires authentication)

### Headers / Cookies
Requires a valid `token` cookie, which is set during Login or Registration.

### Responses

- **200 OK**
  ```json
  {
    "message": "User details fetched successfully",
    "user": {
      "id": "user-id",
      "username": "user-username",
      "email": "user@example.com"
    }
  }
  ```

- **401 Unauthorized**
  Handled by the authentication middleware if the token is missing, expired, or invalid.
