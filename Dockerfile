FROM node

WORKDIR /src
COPY ./dist dist
COPY ./server/package.json .
COPY ./server/server.js .

RUN npm install

CMD [ "node", "server.js" ]