FROM node:14-alpine as react-build

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx

COPY --from=react-build /usr/src/app/build /usr/share/nginx/html

COPY nginx-product.conf /etc/nginx/nginx.conf