FROM node:26-alpine AS build
LABEL authors="shinzenatt"

WORKDIR /home/node
COPY web .

RUN yarn install

RUN yarn generate

FROM nginx:alpine AS deploy

COPY --from=build /home/node/.output/public /usr/share/nginx/html

EXPOSE 80