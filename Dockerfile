FROM node:erbium

# create destination directory
RUN mkdir -p /var/www
WORKDIR /var/www/

# copy the app, note .dockerignore
COPY . /var/www/
RUN npm install

ENV HOST 0.0.0.0

COPY ./scripts/app /usr/local/bin/

RUN chmod +x -R /usr/local/bin

EXPOSE 5005

# start the app
ENTRYPOINT ["start.sh"]