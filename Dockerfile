ARG NODE_VERSION=24.0

FROM node:${NODE_VERSION} AS builder

ARG PYROSCOPE_SERVER
ARG PYROSCOPE_BASIC_AUTH_USER
ARG PYROSCOPE_BASIC_AUTH_PASSWORD
ENV PYROSCOPE_SERVER=$PYROSCOPE_SERVER
ENV PYROSCOPE_BASIC_AUTH_USER=$PYROSCOPE_BASIC_AUTH_USER
ENV PYROSCOPE_BASIC_AUTH_PASSWORD=$PYROSCOPE_BASIC_AUTH_PASSWO

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

FROM node:24-slim AS final

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

COPY package.json .

EXPOSE 3001

CMD ["node", "dist/index.js"]

