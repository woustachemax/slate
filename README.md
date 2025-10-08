# Slate
> A collaborative drawing application, built with a modern turborepo monorepo architecture.

## Overview

Slate is a real-time collaborative drawing platform that allows multiple users to create and edit drawings together. The project uses a turborepo structure with separate HTTP and WebSocket backends, shared packages, and a React Native mobile application.

## Architecture

### Project Structure

```
slate/
├── apps/
│   ├── http-backend/      # REST API server (Express)
│   ├── ws-backend/        # WebSocket server for real-time communication
│   └── mobile/            # React Native mobile application
├── packages/
│   ├── backend-common/    # Shared backend utilities and config
│   ├── common/            # Shared validation schemas (Zod)
│   ├── database/          # Prisma client and database schemas
│   ├── types/             # Shared TypeScript types
│   ├── ui/                # Shared UI components
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── turbo.json            # Turborepo configuration
```

### Technology Stack

- **Backend**: Node.js, Express, TypeScript
- **WebSocket**: ws library for real-time communication
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt for password hashing
- **Validation**: Zod schemas
- **Mobile**: React Native
- **Monorepo**: Turborepo with pnpm workspaces

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Room Management**: Create and join collaborative drawing rooms
- **Real-time Messaging**: WebSocket-based chat and updates
- **Persistent Storage**: Messages and room data stored in PostgreSQL
- **Type Safety**: Full TypeScript support across all packages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database

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
```env
DATABASE_URL="postgresql://user:password@localhost:5432/slate"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

**apps/ws-backend/.env**:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/slate"
JWT_SECRET="your-secret-key-here"
```

4. Set up the database:
```bash
cd packages/database
pnpm prisma migrate dev
pnpm prisma generate
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
pnpm start
```

## API Documentation

### HTTP API (Port 3000)

#### Authentication

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

#### Room Management

**POST /api/v1/room** (requires authentication)
```json
{
  "slug": "string"
}
```

**GET /api/v1/room_exists?roomId={roomId}**

Returns:
```json
{
  "exists": boolean
}
```

### WebSocket API (Port 8080)

Connect with JWT token as query parameter:
```
ws://localhost:8080?token=YOUR_JWT_TOKEN
```

#### WebSocket Messages

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

### Adding New Packages

```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
```

### Database Migrations

```bash
cd packages/database
pnpm prisma migrate dev --name migration_name
```

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

## Package Details

### @repo/backend-common
Shared backend configuration including JWT_SECRET and other environment variables.

### @repo/common
Shared Zod validation schemas for user creation, login, and room creation.

### @repo/database
Prisma client and database schemas for User, Room, and ChatMessage models.

### @repo/types
Shared TypeScript type definitions used across the monorepo.

### @repo/ui
Shared UI components for consistent design across applications.

## Security

- Passwords are hashed using bcrypt with a salt factor of 10
- JWT tokens expire after 7 days
- WebSocket connections require valid JWT authentication
- All API endpoints validate input using Zod schemas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions, please open an issue on GitHub.