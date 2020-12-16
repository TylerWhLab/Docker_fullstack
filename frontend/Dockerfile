# react build
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
# CMD가 아닌 RUN

# cp buildfile&conf nginx
FROM nginx
EXPOSE 3000
# conf file copy
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# build file copy
COPY --from=builder /app/build /usr/share/nginx/html