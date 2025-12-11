FROM node:20-bullseye

RUN apt-get update && \
    apt-get install -y git curl wget unzip && \
    npm install -g expo-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]
