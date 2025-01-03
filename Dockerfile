###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS local

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "start:local"]

FROM node:18-alpine  AS dev

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:dev

EXPOSE 3000

CMD [ "npm", "run", "preview" ]

FROM node:18-alpine  AS prod

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:prod

EXPOSE 3000

CMD [ "npm", "run", "preview" ]
