FROM node:14

RUN npm install -g nx

WORKDIR /app
COPY package.json package-lock.json nx.json tsconfig.base.json angular.json decorate-angular-cli.js .eslintrc.json jest.config.js jest.preset.js ./
RUN npm install

ARG PRODUCTION=$PRODUCTION
EXPOSE 3333

CMD nx serve api
