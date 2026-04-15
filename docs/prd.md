📄 Product Requirements Document (PRD)
1. Project Name

Notion Clone – Real-time Notes Application

2. Overview

A full-stack Notion-like application that allows users to create and manage notes using a block-based editor with real-time updates and authentication system (email/password + Google OAuth).

The system is designed for learning modern backend and frontend architecture including real-time communication, caching, scalable monorepo structure, and authentication strategies.

3. Goals
Build a scalable full-stack application
Learn real-time systems using WebSockets
Implement authentication (email/password + Google OAuth)
Build block-based editor like Notion
Understand Redis caching and pub/sub
Learn monorepo architecture using Turborepo
4. Tech Stack
Frontend
Next.js
React
Tailwind CSS
TypeScript
Backend
NestJS
WebSockets (Socket.io)
JWT Authentication
Google OAuth
Database & Infra
MongoDB
Redis
Docker (optional later)
5. Core Features
5.1 Authentication System
Register with email + password
Login system
JWT-based authentication
Google OAuth login (Provider-based)
Protected routes
5.2 User System
User profile
Username, email, avatar
OAuth users automatically registered
5.3 Notes System
Create note
Update note
Delete note
Fetch notes list
Each note has blocks structure
5.4 Block Editor
Text block
Heading block
Code block (basic)
Image block (later stage)
Nested blocks support (optional later)
5.5 Real-time System
Live updates for note editing
Viewers see changes instantly
Presence system (who is viewing the note)
5.6 File Upload System
Upload images
Store media files
Connect files to notes
6. Authentication Flow
6.1 Email/Password
User registers
Password hashed
JWT issued on login
6.2 Google OAuth Flow
User clicks “Login with Google”
Redirect to Google OAuth
Google returns user profile
Backend checks:
If user exists → login
If not → create new user
JWT generated
7. System Architecture
Frontend (Next.js)
        ↓
Backend (NestJS)
        ↓
MongoDB (data)
Redis (cache + pub/sub)
        ↓
WebSocket (real-time)
8. Data Models (Simple)
User
{
  id,
  name,
  email,
  password?, // optional for OAuth users
  googleId?,
  avatar
}
Note
{
  id,
  title,
  ownerId,
  blocks: Block[],
  createdAt,
  updatedAt
}
Block
{
  id,
  type: "text" | "heading" | "code",
  content: string
}
9. Non-Functional Requirements
Fast real-time updates (<100ms delay target)
Scalable architecture (supports 1000+ users per note later)
Secure authentication (JWT + OAuth)
Modular backend design (NestJS modules)
10. Future Improvements (Not in MVP)
Collaborative editing (multi-cursor CRDT)
Version history
Search engine (full-text search)
AI assistant inside notes
Offline support
11. MVP Scope (Important)
First Version Only:
Register/Login
Google OAuth
Create/Edit/Delete notes
Simple block editor
Real-time viewer updates (not multi-editor yet)