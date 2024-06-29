# Usar a imagem base do Node.js
FROM node:20-alpine3.20

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
