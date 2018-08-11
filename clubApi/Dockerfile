FROM mhart/alpine-node:9 as base
RUN apk add --no-cache make gcc g++ python
WORKDIR /app
COPY package.json /app
RUN npm install --silent

# Only copy over the node pieces we need from the above image
FROM alpine:3.6
COPY --from=base /usr/bin/node /usr/bin/
COPY --from=base /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=base /app .
COPY . .
CMD ["node", "server.js"]
