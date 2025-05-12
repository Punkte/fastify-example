ARG NODE_VERSION=24.0

FROM node:${NODE_VERSION} AS base

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

EXPOSE 3001

COPY . .
