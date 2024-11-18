# Usar la imagen oficial de Node.js como base
FROM node:20.12.0

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package*.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Construir la aplicación NestJS (usualmente se utiliza el comando 'npm run build')
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start"]