FROM node:18.14.2-slim

RUN apt update && apt-get install -y curl && apt-get install -y unzip && apt-get install vim -y

USER node

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node package*.json .

RUN curl -fsSL https://bun.sh/install | bash

RUN ~/.bun/bin/bun install

CMD [ "tail", "-f", "/dev/null" ]