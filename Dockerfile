# Build Stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./server.ts
COPY --from=build /app/tsconfig.server.json ./tsconfig.server.json
COPY --from=build /app/.env.example ./.env

# Install tsx globally to run the server.ts
RUN npm install -g tsx

EXPOSE 8080
CMD ["tsx", "server.ts"]
