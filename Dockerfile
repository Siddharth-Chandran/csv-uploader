FROM node:16 AS image-build
WORKDIR /usr/src/app
COPY . ./csv-uploader-docker/
RUN cd csv-uploader-docker && npm install && npm run build

EXPOSE 3001
WORKDIR /usr/src/app/csv-uploader-docker
CMD ["node", "server/index.js"]