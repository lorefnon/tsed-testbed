ARG NODE_VERSION=18.12.1

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json package-lock.json tsconfig.json tsconfig.compile.json .barrelsby.json ./

RUN npm ci

COPY ./src ./src

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN apk add --no-cache sqlite~=3.40.1-r0
RUN npm install -g pm2

COPY --from=build /opt .

RUN npm ci

COPY ./views ./views
COPY ./dist ./dist
COPY ./public ./public
COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

RUN npm run db:setup

CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
