FROM node:18.16.0 AS build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

COPY ./ /app/

