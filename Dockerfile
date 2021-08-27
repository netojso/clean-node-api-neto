FROM node:12

WORKDIR /usr/projects/clean-node-api

COPY package.json .

RUN npm install --only=prod