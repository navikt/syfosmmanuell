FROM node:16-alpine

RUN apk add --no-cache bash

ARG NPM_AUTH_TOKEN

WORKDIR /app

ENV NODE_ENV production

COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/
COPY package.json /app/
COPY scripts /app/scripts

RUN yarn install --immutable

COPY .next /app/.next/
COPY public /app/public/
COPY next.config.js /app/

CMD ["yarn", "start:prod"]
