FROM node:22-alpine as base
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install pg

FROM base as development
ENV NODE_ENV=development
RUN npm ci --only=dev
RUN npm install pg
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as production
ENV NODE_ENV=production
RUN npm ci --only=production
RUN npm install pg
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
