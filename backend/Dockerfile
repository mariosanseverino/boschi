FROM node:16-alpine3.18

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 5433

CMD [ "node", "build/src/server.js" ]
