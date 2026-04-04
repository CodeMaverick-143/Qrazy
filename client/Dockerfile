# Stage 1: Build the Vite application
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Pass build arguments for environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_API_URL

# Set environment variables for the build process
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_API_URL=$VITE_API_URL

# Build the project
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine

# Copy the build artifacts from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Default values for environment variables used in Nginx config
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=4000

# Expose port 80
EXPOSE 80

# The official Nginx image supports environment variables in templates
# It automatically runs envsubst on files in /etc/nginx/templates/*.template
# and outputs the result to /etc/nginx/conf.d/*.conf before starting Nginx.
CMD ["nginx", "-g", "daemon off;"]
