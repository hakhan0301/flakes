FROM node:17

WORKDIR /usr/src/app

COPY . .
RUN npm install


RUN cd ./packages/db
RUN npx prisma db push
RUN cd ../..

RUN cd ./apps/webapp
RUN npm run build

RUN cd ..
RUN cp -r ./webapp/build/* ./api/public/

RUN cd ./api

CMD [ "npm", "start" ]
EXPOSE 8000