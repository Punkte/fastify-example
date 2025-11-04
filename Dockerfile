ARG NODE_VERSION=24.0

FROM node:${NODE_VERSION} AS builder

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

