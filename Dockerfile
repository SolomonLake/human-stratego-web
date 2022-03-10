FROM node:17.5 AS client-build
WORKDIR /usr/src/app
COPY client/ ./client/
COPY types/ ./types/
RUN cd client && npm install && npm run build

FROM node:17.5 AS server-build
WORKDIR /root/
COPY --from=client-build /usr/src/app/client/build ./client/build
COPY server/ ./server/
COPY types/ ./types/
RUN cd server && npm install && npm run build

EXPOSE 8080

CMD ["node", "./server/dist/index.js"]