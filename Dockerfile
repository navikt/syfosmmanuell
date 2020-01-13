FROM navikt/node-express:12.2.0-alpine

WORKDIR /src
COPY ./build build
COPY ./server/package.json .
COPY ./server/server.js .

RUN npm install

COPY start.sh .
RUN chmod +x start.sh
RUN ls -al

CMD ["/start.sh"]