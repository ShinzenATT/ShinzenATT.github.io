FROM node:20-alpine as build
LABEL authors="shinzenatt"

WORKDIR /home/node
COPY web .

RUN yarn install

RUN yarn generate

FROM nginx:alpine as deploy

COPY --from=build /home/node/dist /usr/share/nginx/html

EXPOSE 80