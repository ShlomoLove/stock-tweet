FROM node:current-slim

WORKDIR /stocktweet

COPY package*.json ./
RUN npm install
COPY . /stocktweet 
EXPOSE 80 
CMD ["npm", "start"]