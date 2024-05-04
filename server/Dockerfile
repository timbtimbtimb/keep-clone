FROM node:latest

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "."]
