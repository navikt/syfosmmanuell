FROM node

WORKDIR /src
COPY ./dist dist
COPY ./server/package.json .
COPY ./server/server.js .

RUN npm install

EXPOSE 8080
CMD [ "node", "server.js" ]