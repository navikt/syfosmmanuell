FROM navikt/node-express:12.2.0-alpine

WORKDIR /src
COPY ./build build
COPY ./server .

RUN npm install

CMD ["npm", "start"] 