FROM node:18-alpine

WORKDIR /usr/app

COPY . .

RUN yarn
RUN yarn build

CMD ["yarn", "start"]