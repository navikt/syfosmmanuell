FROM gcr.io/distroless/nodejs20-debian11@sha256:f9c4cd4e417c73be8ac64032eeb08584311d82950d86590ec33b378c8523c032

WORKDIR /app

COPY next-logger.config.mjs /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
