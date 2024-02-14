
FROM node:20-alpine AS build

WORKDIR /app

COPY ./init/package.json .

COPY ./init/tsconfig.json .

COPY ./init/src/deploy.ts ./src/deploy.ts

COPY ./bot/src/commands/data ./src/commands

RUN npm i

RUN npm run build

FROM node:20-alpine AS run

WORKDIR /app

COPY --from=build /app/dist /app

COPY --from=build /app/package.json /app

ENV NODE_ENV=production

RUN npm i --omit=dev

ENTRYPOINT ["node", "deploy.js"]
