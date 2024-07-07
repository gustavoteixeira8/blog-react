FROM node:18.17.1

WORKDIR /blog

COPY package.json /blog/
COPY build /blog/build

# RUN apt install xsel

RUN npm i --omit=dev

RUN npm i serve -g

CMD [ "npm", "run", "start:prod" ]
