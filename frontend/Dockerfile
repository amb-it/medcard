FROM node:carbon

# create cache directory for ability to make "npm install" in container and then copy node_modules to host machine
RUN mkdir /srv/cache
WORKDIR /srv/cache

COPY app/package*.json ./

RUN npm install

WORKDIR /srv/www
