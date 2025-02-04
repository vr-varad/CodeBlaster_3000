FROM docker:20.10-dind

RUN apk add --no-cache \
    nodejs \
    npm \
    python3 \
    tini \
    sudo \
    && addgroup -S docker \
    && adduser -S docker -G docker


WORKDIR /app

COPY package.json ./

RUN npm install

VOLUME /var/run/docker.sock

COPY . .


EXPOSE 3000

CMD ["tini", "--", "sh", "-c", "dockerd-entrypoint.sh & npm start"]
