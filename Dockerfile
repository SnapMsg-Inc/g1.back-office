FROM node:18

WORKDIR /usr/snapmsg-backoffice

COPY package.json package.json

RUN npm i

COPY . .
RUN chmod +x node_modules/.bin/react-scripts

EXPOSE 8080

# place env vars here
ENV PORT=8080

RUN npm run build

CMD ["npm", "run", "start"]

