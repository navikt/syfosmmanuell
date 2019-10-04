FROM navikt/node-express:12.2.0-alpine

WORKDIR /src
COPY ./dist dist
COPY ./server/package.json .
COPY ./server/server.js .

RUN ls 
RUN npm install

CMD [ "node", "server.js" ]