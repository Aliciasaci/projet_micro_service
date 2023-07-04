FROM node:20-alpine3.17

WORKDIR /api

RUN apk update && \
    apk add --no-cache curl && \
    npm install -g pnpm && \
    pnpm config set global-bin-dir /usr/local/pnpm/bin && \
    export PATH="$PATH:/usr/local/pnpm/bin" && \
    pnpm install -g @nestjs/cli prisma && \
    pnpm start:dev
