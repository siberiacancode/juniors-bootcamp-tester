FROM node:22-alpine AS base
LABEL org.opencontainers.image.source https://github.com/shift-intensive/web-tester

FROM base AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --production --frozen-lockfile --ignore-scripts
RUN yarn add vite @vitejs/plugin-react --ignore-scripts

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=builder /app/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html/tester

EXPOSE 3014

CMD ["nginx", "-g", "daemon off;"]
