FROM node:current-slim

WORKDIR /stocktweet

COPY package*.json ./
RUN npm install
COPY . /stocktweet 
EXPOSE 3001 
CMD ["npm", "start"]