FROM node:alpine

RUN apk add --update curl && \
  rm -rf /var/cache/apk/*

WORKDIR /app
COPY package.json /app
RUN npm install
COPY index.js config.js /app/
CMD ["npm", "start"]
