FROM node:alpine

WORKDIR /app

COPY ./server/package.json ./
COPY ./packages ../packages
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://mongo:27017
ENV REDIS_PORT=6379
ENV REDIS_HOST=redis

EXPOSE 3000

CMD ["npm", "start"]