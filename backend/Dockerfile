FROM node:12.14.0

WORKDIR /usr/app/backend

#Copia os arquivos para o docker
COPY package*.json ./
#Instala as dependências
RUN npm install

COPY . .

EXPOSE 3334

CMD [ "npm","start" ]