FROM gcr.io/distroless/nodejs20-debian12@sha256:9eca0408bab56efca3d3e25e2e22555331eba5b83cf010d61354b6dff7f557e2

WORKDIR /app

COPY next-logger.config.mjs /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
