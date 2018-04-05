FROM node:9.10.0

ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
RUN rm -rf ./src

CMD ["npm", "run", "dev"]
