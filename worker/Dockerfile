FROM docker:20.10-dind

RUN apk add --no-cache \
    nodejs \
    npm \
    python3 \
    tini \
    sudo \
    shadow 

RUN addgroup -S docker
RUN adduser -S docker -G docker
RUN echo "docker ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN mkdir -p /home/docker && chown docker:docker /home/docker


WORKDIR /app

COPY ./worker/package.json ./

COPY ./packages ../packages

RUN npm install

VOLUME /var/run/docker.sock

COPY . .

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://mongo:27017
ENV REDIS_PORT=6379
ENV REDIS_HOST=redis


EXPOSE 3000

CMD ["tini", "--", "sh", "-c", "dockerd-entrypoint.sh & npm start"]
