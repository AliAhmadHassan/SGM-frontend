FROM node:10-alpine as builder
ARG env=staging_luxfacta
COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app
COPY . .
RUN npm run build -- --configuration $env

FROM nginx:1.14.1-alpine
COPY default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/* /usr/share/nginx/html/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]