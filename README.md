# Slate
>A collaborative drawing application built with a modern turborepo monorepo architecture, containerized with Docker and deployed on Railway.

## Overview

Slate is a real-time collaborative drawing platform that allows multiple users to create and edit drafts together. The project uses a turborepo structure with separate HTTP and WebSocket backends, shared packages, and a React Native mobile application.

## Architecture

### Project Structure

```
slate/
├── apps/
│   ├── http-backend/      
│   ├── ws-backend/        
│   └── mobile/            # React Native mobile application (in progress)
├── packages/
│   ├── backend-common/    # Shared backend utilities and config
│   ├── common/            # Shared validation schemas (Zod)
│   ├── database/          # Prisma client and database schemas
│   ├── types/             # Shared TypeScript types
│   ├── ui/                # Shared UI components
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── turbo.json             # Turborepo configuration
├── apps/http-backend/Dockerfile
└── apps/ws-backend/Dockerfile
```

### Technology Stack

- Backend: Node.js, Express, TypeScript
- WebSocket: ws library for real-time communication
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT with bcrypt for password hashing
- Validation: Zod schemas
- Mobile: React Native (coming soon)
- Monorepo: Turborepo with pnpm workspaces
- Containerization: Docker
- Deployment: Railway

## Deployment

### Docker

Build and run Docker images locally:

```bash
docker build -f apps/http-backend/Dockerfile -t http-backend .
docker run -p 3000:3000 http-backend

docker build -f apps/ws-backend/Dockerfile -t ws-backend .
docker run -p 8080:8080 ws-backend
```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Create two services, one for each backend
3. Set the Dockerfile path for each service:
   - HTTP Backend: `apps/http-backend/Dockerfile`
   - WebSocket Backend: `apps/ws-backend/Dockerfile`
4. Add environment variables in the Railway dashboard:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secret key for JWT signing
   - `PORT`: Service port
   - `HTTP_API_URL`: (For WS backend only) URL to HTTP backend

Railway will automatically detect the Dockerfiles and deploy both services.

## Features

- User Authentication: Secure signup and login with JWT tokens
- Room Management: Create and join collaborative drawing rooms
- Real-time Messaging: WebSocket-based chat and updates
- Persistent Storage: Messages and room data stored in PostgreSQL
- Type Safety: Full TypeScript support across all packages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database
- Docker (for containerized deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/woustachemax/slate
cd slate
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create `.env` files in the following locations:

**apps/http-backend/.env**:
```
DATABASE_URL="postgresql://user:password@localhost:5432/slate"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

**apps/ws-backend/.env**:
```
DATABASE_URL="postgresql://user:password@localhost:5432/slate"
JWT_SECRET="your-secret-key-here"
PORT=8080
HTTP_API_URL="http://localhost:3000"
```

4. Set up the database:

```bash
pnpm run build
```

### Running the Application

#### Development Mode

Run all services concurrently:

```bash
pnpm dev
```

Or run individual services:

```bash
cd apps/http-backend
pnpm dev

cd apps/ws-backend
pnpm dev

cd apps/mobile
pnpm start
```

#### Production Mode

```bash
pnpm build
```

Then run Docker containers as shown in the Docker section.

## API Documentation

### HTTP API (Port 3000)

**POST /api/v1/signup**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**POST /api/v1/login**
```json
{
  "email": "string",
  "password": "string"
}
```

**POST /api/v1/room** (requires authentication)
```json
{
  "slug": "string"
}
```

**GET /api/v1/room_exists?slug={slug}**
```json
{
  "exists": boolean
}
```

**GET /api/v1/room/:slug**
```json
{
  "room": { id, slug, adminId }
}
```

### WebSocket API (Port 8080)

Connect with JWT token:
```
ws://localhost:8080?token=YOUR_JWT_TOKEN
```

**Join Room**:
```json
{
  "action": "join_room",
  "roomId": "string"
}
```

**Leave Room**:
```json
{
  "action": "leave_room",
  "roomId": "string"
}
```

**Send Message**:
```json
{
  "action": "message",
  "roomId": "string",
  "content": "string"
}
```

**Receive Message**:
```json
{
  "type": "message",
  "message": "string",
  "from": "userId",
  "roomId": "string"
}
```

## Development

### Type Checking

```bash
pnpm check-types
```

### Linting

```bash
pnpm lint
```

### Database Migrations

```bash
cd packages/database
pnpm prisma migrate dev --name migration_name
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- WebSocket connections require valid JWT authentication
- All API endpoints validate input using Zod schemas

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request