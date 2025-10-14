FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/ws-backend ./apps/ws-backend

RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

RUN pnpm run build

WORKDIR /app/apps/ws-backend

EXPOSE 8080

CMD ["node", "dist/index.js"]