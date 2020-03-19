FROM node:carbon

# create cache directory for ability to make "npm install" in container and then copy node_modules to host machine
#RUN mkdir /srv/cache
#WORKDIR /srv/cache

WORKDIR /srv/www

COPY ./frontend/package*.json ./
RUN npm install