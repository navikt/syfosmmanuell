FROM navikt/common:0.2 AS navikt-common
FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /app

# Copy init script for loading vault credentials into environment variables.
# Runs at container start throught magic in navikt/common
COPY init.sh /init-scripts/init.sh

# Copy next app
COPY package*.json /app/
COPY scripts /app/scripts

RUN npm ci

COPY .next /app/.next/
COPY public /app/public/
COPY next.config.js /app/

# Start the web server
CMD ["npm", "run", "start:prod"]
