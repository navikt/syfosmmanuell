FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
