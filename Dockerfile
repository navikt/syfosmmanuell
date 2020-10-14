FROM navikt/node-express:12.2.0-alpine

# Copy init script for loading vault credentials into environment variables.
# Runs at container start
COPY init.sh /init-scripts/init.sh

WORKDIR /src
COPY ./build build
COPY ./server .

RUN npm install

CMD ["npm", "start"]