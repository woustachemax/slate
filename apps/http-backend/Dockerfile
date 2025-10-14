FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/http-backend ./apps/http-backend

RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

RUN pnpm run build

WORKDIR /app/apps/http-backend

EXPOSE 3000

CMD ["node", "dist/index.js"]