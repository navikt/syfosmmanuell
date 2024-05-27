FROM gcr.io/distroless/nodejs20-debian11@sha256:71d67364fd981db2372fdaea3a32e3b1656a7670c5eeef7b2c2c909d8f7c9a2a

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/
COPY next-logger.config.js /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'
ENV HOSTNAME=0.0.0.0

CMD ["server.js"]
