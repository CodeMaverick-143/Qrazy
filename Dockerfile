FROM node:20-bookworm-slim AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build


FROM node:20-bookworm-slim AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/prisma ./prisma/
RUN npx prisma generate
COPY server/ ./


FROM node:20-bookworm-slim
WORKDIR /app


COPY --from=server-builder /app/server /app/server


RUN mkdir -p /app/server/public
COPY --from=client-builder /app/client/dist /app/server/public


WORKDIR /app/server


EXPOSE 4000


ENV NODE_ENV=production
ENV PORT=4000

CMD ["npm", "start"]
