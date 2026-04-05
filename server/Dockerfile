# Production Dockerfile for Backend
FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
