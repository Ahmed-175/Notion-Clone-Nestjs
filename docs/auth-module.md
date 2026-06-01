# Authentication Module Documentation

The `AuthModule` in this project handles user authentication using NestJS, Passport, JWT, and Google OAuth 2.0.

## Overview

The authentication system is designed to be secure and seamless, supporting both traditional email/password login and Google OAuth. Tokens are stored in `httpOnly` cookies to mitigate XSS risks.

## Technologies Used

- **NestJS**: The core framework.
- **Passport.js**: Used for authentication strategies (Google and JWT).
- **JWT (JSON Web Tokens)**: Used for stateless session management.
- **Mongoose**: Used for user data persistence in MongoDB.

## Authentication Flow

1.  **Login/Register**: When a user logs in or registers, the server validates the credentials (or OAuth data).
2.  **JWT Generation**: Upon successful validation, the `UsersService` generates a JWT containing the user's ID.
3.  **Cookie Response**: The server sets an `access_token` cookie in the response with `httpOnly: true`. This cookie is automatically sent by the browser in subsequent requests.
4.  **Authorization**: For protected routes, the `JwtGuard` (using `JwtStrategy`) extracts the token from the cookie, validates it, and attaches the user object to the request.

## Endpoints

### 1. Google OAuth Initiation
- **Path**: `GET /auth/google`
- **Description**: Redirects the user to the Google login page.

### 2. Google OAuth Callback
- **Path**: `GET /auth/google/callback`
- **Description**: Handles the callback from Google. If successful, it creates/finds the user, sets the `access_token` cookie, and redirects to the home page (`http://localhost:3000/home`).

### 3. User Registration
- **Path**: `POST /auth/register`
- **Body**: `CreateUserDto` (username, email, password)
- **Description**: Registers a new user, hashes the password, sets the `access_token` cookie, and returns a success message.

### 4. User Login
- **Path**: `POST /auth/login`
- **Body**: `LoginAuthDto` (email, password)
- **Description**: Validates user credentials, sets the `access_token` cookie, and returns a success message.

### 5. Get Current User
- **Path**: `GET /auth/me`
- **Guard**: `JwtGuard`
- **Description**: Returns the profile information of the currently authenticated user.

## Key Components

### `AuthModule`
The main entry point for the authentication logic. It imports `UsersModule` and `PassportModule`.

### `AuthController`
Defines the REST endpoints for authentication. It delegates most business logic to the `UsersService`.

### `UsersService`
Handles user creation, database lookups, password hashing (via `PasswordHasher`), and JWT signing.

### Strategies
- **`GoogleStrategy`**: Handles the logic for Google OAuth verification.
- **`JwtStrategy`**: Extends `PassportStrategy` to validate the `access_token` from cookies.

## How to use in Frontend

Since the `access_token` is stored in an `httpOnly` cookie, you don't need to manually attach it to headers. Axios (or fetch) will include the cookie automatically if `withCredentials: true` is set in the configuration.

Example:
```typescript
const response = await axios.get('/auth/me', { withCredentials: true });
```
