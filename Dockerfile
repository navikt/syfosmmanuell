FROM navikt/node-express:12.2.0-alpine

WORKDIR /src
COPY ./build build
COPY ./server/package.json .
COPY ./server/server.js .

RUN npm install

COPY ./server/setEnvVars.sh .
RUN ls "/secrets/azuread/syfosmmanuell"
RUN ls -al
RUN ["./setEnvVars.sh"]

CMD ["source", "envFile", "&&", "node", "server.js" ]