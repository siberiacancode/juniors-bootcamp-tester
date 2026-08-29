FROM node:22-alpine AS base
LABEL org.opencontainers.image.source=https://github.com/siberiacancode/juniors-bootcamp-tester

FROM base AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN CI=true pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:latest

COPY --from=builder /app/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html/tester

EXPOSE 3014

CMD ["nginx", "-g", "daemon off;"]