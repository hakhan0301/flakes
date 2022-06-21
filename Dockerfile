FROM node:17

WORKDIR /usr/src/app

COPY . .
RUN npm install


WORKDIR /usr/src/app/packages/db
RUN npx prisma db push

WORKDIR /usr/src/app/apps/webapp
RUN npm run build

WORKDIR /usr/src/app/apps
RUN cp -r ./webapp/build/* ./api/public/

WORKDIR /usr/src/app/apps/api

CMD [ "npm", "start" ]
EXPOSE 8000