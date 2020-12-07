FROM node:12.16.3
WORKDIR /home/app
COPY package.json .
COPY ./build ./build
COPY ./serve ./serve
RUN npm i -g nodemon
RUN npm i --save-dev express

EXPOSE 3001
CMD yarn serve 