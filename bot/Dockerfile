

FROM node:20-alpine AS build

WORKDIR /app

COPY . /app

RUN echo $(ls)

RUN npm i

RUN npm run build


FROM node:20-alpine AS run

WORKDIR /app

COPY --from=build /app/dist /app

COPY --from=build /app/package.json /app

RUN apk add ffmpeg -q

ENV NODE_ENV=production

RUN npm i --omit=dev

ENTRYPOINT ["node", "bot.js"]
