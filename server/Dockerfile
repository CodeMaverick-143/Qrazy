# Stage 1: Build and Dependencies
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copy package files separately to leverage caching
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for prisma generate)
# Use --legacy-peer-deps to avoid React 19 / QR conflicts if any
RUN npm install --legacy-peer-deps

# Stage 2: Production Runtime
FROM node:20-bookworm-slim AS runner

WORKDIR /app

# Install curl and openssl for healthchecks and Prisma, then clean up
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Copy node_modules and prisma files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Copy source code
COPY . .

# Generate Prisma Client in the runner stage to match the architecture
# Generate Prisma Client in the runner stage to match the architecture
# We provide dummy values because the prisma.config.ts requires them during generation
RUN DATABASE_URL="postgresql://localhost:5432" DIRECT_URL="postgresql://localhost:5432" npx prisma generate

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
