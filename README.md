# Notion Clone – Real-time Notes Application

A high-performance, real-time Notion-like collaborative editor built using a modern full-stack TypeScript architecture. This project showcases block-based note editing, live user presence tracking, and flexible monorepo development patterns.

## Screenshots

|                Authentication Page                |                Home Page                |
| :-----------------------------------------------: | :-------------------------------------: |
| ![Authentication Page](docs/assets/auth-page.png) | ![Home Page](docs/assets/home-page.png) |

|              Folder View               |                Note Editor                |
| :------------------------------------: | :---------------------------------------: |
| ![Folder View](docs/assets/folder.png) | ![Note Editor](docs/assets/note-page.png) |

## Technologies

The project is designed with a modern, decoupled, and highly scalable stack:

### Frontend

- **Next.js 16** (App Router) — For static and dynamic routing, optimized rendering, and modular page layouts.
- **React 19** — Core component hierarchy and client-side interactivity.
- **Tailwind CSS 4** — Utility-first styling with modern PostCSS configurations for highly responsive layouts.
- **Axios** — Robust HTTP client for structured interactions with the backend API.
- **React Icons** — Modern vector icons.
- **React Context API** — Light-weight client state management for active nodes, UI themes, and workspace menus.

### Backend

- **NestJS 11** — Progressive Node.js framework for building efficient, testable, and highly structured microservices and APIs.
- **Passport.js** — Secure local credentials (JWT-based) and Google OAuth 2.0 third-party authentication flows.
- **Mongoose** — Elegant MongoDB object modeling for managing users, notes, and block structures.
- **Socket.io / WebSockets** — Bidirectional, low-latency communication layer for real-time collaboration.
- **Swagger API Docs** — Automated API schema generation and sandbox at `/docs` (via `@nestjs/swagger`).

### Database & Cache

- **MongoDB** — Primary document database storing persistent user accounts, note schemas, and content blocks.
- **Redis (ioredis)** — Ultra-fast in-memory cache utilized for live user presence tracking, tracking active connection sockets, and pub/sub events.

### Tooling & Infrastructure

- **Turborepo** — High-performance monorepo build system for caching, dependency resolution, and parallel execution.
- **Docker Compose** — Local container orchestration to run MongoDB and Redis instantly.
- **TypeScript** — Strongly typed contract sharing across client and server.
- **ESLint & Prettier** — Code style checking and automatic code formatting.

---

## Quick Start

Follow these steps to initialize the project and get your local development environment running in under 5 minutes:

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (version 10 or higher)
- **Docker Desktop** (for running MongoDB and Redis)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ahmed-175/Notion-Clone-Nestjs.git
cd Notion-Clone-Nestjs
```

### Step 2: Initialize Configuration

We provide an interactive workspace setup script. Execute it to copy sample configurations and prepare local environments:

```bash
npm run setup
```

This script automatically copies `apps/backend/.env.example` into `apps/backend/.env` and `apps/frontend/.env.example` into `apps/frontend/.env.local`.

### Step 3: Configure Environment Variables

#### Backend Configuration

Open `apps/backend/.env` and set the required variables:

```ini
MONGO_URL=mongodb://localhost:27017/notion-clone
JWT_SECRET=your-secure-jwt-signing-key

# Get these from Google Cloud Console (APIs & Services > Credentials)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Frontend Configuration

Open `apps/frontend/.env.local` and ensure the backend URL is correct:

```ini
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

### Step 4: Start Infrastructure Containers

Launch MongoDB and Redis databases using Docker Compose:

```bash
docker compose up -d
```

Verify that the databases are running locally on their default ports:

- **MongoDB**: `27017`
- **Redis**: `6379`

### Step 5: Install Dependencies

Install all package dependencies for the monorepo from the root directory:

```bash
npm install
```

### Step 6: Run in Development Mode

Start both backend and frontend development servers concurrently:

```bash
npm run dev
```

- **Next.js Frontend**: [http://localhost:3000](http://localhost:3000)
- **NestJS Backend API**: [http://localhost:8000](http://localhost:8000)
- **Swagger API Docs Explorer**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Step 7: Build for Production

To build static bundles and transpile NestJS code:

```bash
npm run build
```

---

## Project Structure

This monorepo uses **Turborepo** to structure and manage dependencies between apps and packages:

```
Notion-Clone/
├── apps/
│   ├── frontend/         # Next.js 16 Web application (Client)
│   └── backend/          # NestJS 11 Web API & Websocket Server (Server)
├── packages/
│   ├── ui/               # Shared React UI component library (@repo/ui)
│   ├── eslint-config/    # Shared lint configurations (@repo/eslint-config)
│   └── typescript-config/# Shared TS configuration guidelines (@repo/typescript-config)
├── docs/                 # Documentation, PRDs, and asset templates
├── scripts/              # Workspace initialization and setup automation scripts
├── docker-compose.yml    # Database containers configuration (Mongo + Redis)
├── package.json          # Monorepo configuration and workspace actions
└── turbo.json            # Turborepo build caching definitions
```

## Contribution Guidelines

We welcome contributions! Please follow these rules to ensure high-quality and consistent code.
