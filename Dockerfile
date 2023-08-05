FROM node:16

RUN mkdir /app && chmod 777 /app

WORKDIR /app

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY . /app

RUN npm cache clean --force && \
  npm install

EXPOSE 5000

CMD ["npm", "start"]
