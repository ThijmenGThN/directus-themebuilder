FROM node:18-alpine

WORKDIR /usr/app

COPY . .

RUN npm i -g yarn
RUN yarn
RUN yarn build

CMD ["yarn", "start"]