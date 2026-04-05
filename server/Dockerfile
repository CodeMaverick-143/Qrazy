
FROM node:20-bookworm-slim

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY prisma ./prisma/
RUN npx prisma generate


COPY . .


ENV NODE_ENV=production
ENV PORT=4000


EXPOSE 4000


CMD ["npm", "start"]
