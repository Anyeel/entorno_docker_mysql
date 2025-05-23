#!/bin/bash

# Nombre de la imagen y el contenedor
IMAGE_NAME="mysql-paneldb"
CONTAINER_NAME="mysql-paneldb-container"

# Construir la imagen de Docker
echo "Construyendo la imagen de Docker..."
docker build -t $IMAGE_NAME .

# Verificar si el contenedor ya existe
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "El contenedor $CONTAINER_NAME ya existe. Eliminándolo..."
  docker rm -f $CONTAINER_NAME
fi

# Crear y levantar el contenedor
echo "Creando y levantando el contenedor..."
docker run --name $CONTAINER_NAME -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=pass1234 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=angel \
  -e MYSQL_PASSWORD=secret1234 \
  $IMAGE_NAME

# Verificar si el contenedor está corriendo
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "El contenedor $CONTAINER_NAME está corriendo correctamente."
else
  echo "Hubo un problema al iniciar el contenedor."
fi

# Dar permisos: chmod +x launch.sh
# Ejecutar el script: ./launch.sh
