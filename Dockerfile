FROM node:10

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

RUN apt-get update || : && apt-get install python -y

COPY . .