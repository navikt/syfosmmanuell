FROM navikt/node-express

WORKDIR /src
COPY ./dist dist
COPY ./server/package.json .
COPY ./server/server.js .

RUN ls 
RUN npm install

CMD [ "node", "server.js" ]