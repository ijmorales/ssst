FROM node:alpine

# Create app directory

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./


RUN npm install

USER node

COPY --chown=node:node . .
COPY --chown=node:node .env .env

ENV NODE_ENV dev

EXPOSE 8080

CMD ["npm", "run", "dev"]
