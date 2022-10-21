FROM node:18-alpine

# Create app directory
WORKDIR /app

# ENV
ENV MYSQL_HOST=host.docker.internal
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DBNAME=todo-list

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npx sequelize db:migrate

# Bundle app source
COPY . .

EXPOSE 3030

CMD [ "node", "index.js" ]