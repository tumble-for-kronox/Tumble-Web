FROM node:18.16.0 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.26

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
