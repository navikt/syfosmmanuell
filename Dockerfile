FROM node

WORKDIR /server
COPY ./dist dist
COPY ./server .

RUN echo "hello from container"
RUN ls
RUN npm install
