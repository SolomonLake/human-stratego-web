FROM node:10-slim AS client-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:10-slim AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/client/build ./client/build
COPY server/ ./server/
RUN cd server && npm install && npm run build

EXPOSE 8080

CMD ["node", "./server/dist/index.js"]