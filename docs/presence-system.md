Presence System Documentation

1. Overview

The presence system is a real-time feature that tracks active users on a specific note. It allows collaborators to see who is currently viewing or editing the same content, providing a "live" feel to the application.

2. Goals

   Track online users per note
   Provide instant updates when users join or leave
   Manage volatile state efficiently using Redis
   Secure WebSocket connections with JWT

3. Tech Stack

   Backend: NestJS WebSockets (@nestjs/platform-socket.io)
   Real-time: Socket.io
   State Management: Redis (Sets)
   Database: MongoDB (User profile fetching)

4. System Architecture

   Frontend (Socket Client)
   ↓
   Backend Presence Gateway (Auth Middleware)
   ↓
   Redis (Store Active IDs)
   ↓
   MongoDB (Fetch User Details)
   ↓
   Broadcast to Room

5. Core Logic

   5.1 Connection Flow
   User opens a note page
   Frontend initiates socket connection to `/note` namespace
   note_id passed in handshake headers
   Backend validates JWT token
   User added to Redis Set: note:{noteId}:online-users
   Socket joins room: note:{noteId}

   5.2 Disconnection Flow
   User closes tab or leaves note
   Socket disconnects
   Backend removes User ID from Redis Set
   Broadcast remove-active-user to the room

6. Real-time Events (Socket.io)

   6.1 Server to Client
   all-online-users: Returns list of all active users on connection
   add-active-user: Broadcasted when a new user joins
   remove-active-user: Broadcasted when a user leaves

   6.2 Client to Server
   Connection Handshake: Contains note_id and Auth Token

7. Redis Data Structure

   Key: note:{noteId}:online-users
   Type: Set (SADD, SREM, SMEMBERS)
   Storage: Only stores User IDs to keep memory usage low

8. Security

   Authentication: Handled via WsAuthService
   Middleware: Intercepts connection and verifies JWT
   Unauthorized: Connections without valid tokens are rejected
