FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# On copie le code APRES l'installation
COPY . .

CMD ["npm", "run", "dev"]
