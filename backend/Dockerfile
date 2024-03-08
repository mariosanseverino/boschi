FROM node:16-alpine3.18

WORKDIR /backend

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 5432

CMD ["node", "app.js"]
