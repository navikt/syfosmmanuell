FROM node

WORKDIR /src
COPY ./dist dist
COPY ./server/package.json .
COPY ./server/server.js .
COPY ./src/mock mock/

RUN ls dist/
RUN ls mock/
RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]