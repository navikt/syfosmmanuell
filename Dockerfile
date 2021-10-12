FROM node:16-alpine

RUN apk add --no-cache bash

RUN addgroup -g 1069 user && \
    adduser -u 1069 -G user -s /bin/sh -D user

WORKDIR /app

COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/
copy init.sh /app/
COPY package.json /app/
COPY scripts /app/scripts

RUN yarn install --immutable

COPY .next /app/.next/
COPY public /app/public/
COPY next.config.js /app/

RUN chown user:user -R .next
USER user

ENTRYPOINT ["./init.sh"]
CMD ["yarn", "start:prod"]
