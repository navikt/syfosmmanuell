FROM gcr.io/distroless/nodejs22-debian12@sha256:c7888b24c244ae0325d421eb6ff1dd34d6ebc53666e46cf7736f5cb52bb5c360

WORKDIR /app

COPY next-logger.config.mjs /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
