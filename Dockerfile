FROM node:latest
ENV DATABASE_NAME "database"
ENV DATABASE_HOST "localhost"
ENV DATABASE_PORT "3306"
ENV DATABASE_USER "root"
ENV API_URL "localhost"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
