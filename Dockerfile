FROM node:18.16.0 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.26

RUN mkdir -p /tmp/nginx/conf/ && mkdir -p /tmp/nginx/logs/ && mkdir -p /tmp/nginx/body/ && mkdir -p /tmp/nginx/proxy/ && mkdir -p /tmp/nginx/fastcgi/ && mkdir -p /tmp/nginx/uwsgi/ && mkdir -p /tmp/nginx/scgi/

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN sed -i -e 's/{$PORT}/'"{$PORT}"'/g' /etc/nginx/nginx.conf
