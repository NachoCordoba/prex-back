FROM node:19-alpine as test
COPY . /usr/prex-back
WORKDIR /usr/prex-back
RUN npm install
RUN npm run test

FROM node:19-alpine as build
COPY . /usr/prex-back
WORKDIR /usr/prex-back
RUN npm install 
RUN npm run build

FROM node:19-alpine as deploy
WORKDIR /usr/prex-back
COPY --from=build /usr/prex-back .

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]