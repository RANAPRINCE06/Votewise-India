# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app
# Only copy the essential production files
COPY package*.json ./
RUN npm install --production --frozen-lockfile
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./server.ts
COPY --from=build /app/tsconfig.server.json ./tsconfig.server.json

# Use npx to run tsx without a global install to keep image small
EXPOSE 8080
CMD ["npx", "tsx", "server.ts"]
