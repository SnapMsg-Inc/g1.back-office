FROM node:18

WORKDIR /usr/snapmsg-backoffice

COPY package.json package.json

RUN npm i

COPY . .

EXPOSE 8080

# place env vars here
ENV PORT=8080
ENV REACT_APP_GOOGLE_API_KEY=AIzaSyCmlfaciH4N_Ydih2RzNXEWr2G_V1En1sw
ENV REACT_APP_WEB_CLIENT_ID=835956360594-7msbe422kdle04b7kdb4uqput39giim9.apps.googleusercontent.com
ENV REACT_APP_APP_ID=1:835956360594:web:62491d09ca2e166c4d6d4b
ENV REACT_APP_MESSAGE_SENDER_ID=835956360594
ENV REACT_APP_URL_USERS=https://api-gateway-marioax.cloud.okteto.net/users

RUN npm run build

CMD ["npm", "run", "start"]

