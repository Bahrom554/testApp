FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 4400

CMD ["node", "app.js"]