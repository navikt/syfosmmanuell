FROM gcr.io/distroless/nodejs20-debian11@sha256:eea3aff7dd06980ecf297e2c57e7b1f74c96bc7e71f524b907f894597d6f47f6

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
