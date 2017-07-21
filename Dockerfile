FROM node:latest

RUN mkdir /var/app

COPY . /var/app
WORKDIR /var/app

EXPOSE 3001

CMD ["node", "app.js"]