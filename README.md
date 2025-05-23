# Proyecto con Docker y MySQL

Este proyecto utiliza Docker para levantar un entorno con MySQL y una base de datos preconfigurada.

## Requisitos previos

- [Docker](https://www.docker.com/) instalado en tu máquina.
- [Docker Compose](https://docs.docker.com/compose/) instalado (opcional, si usas `docker-compose`).

## Archivos importantes

- `Dockerfile`: Configuración para construir la imagen de Docker.
- `mysqld.cnf`: Archivo de configuración para MySQL.
- `paneldb_dump.sql`: Dump de la base de datos que se cargará al iniciar el contenedor.
- `launch.sh`: Script para iniciar el contenedor.

## Pasos para levantar el proyecto

1. **Construir la imagen de Docker**  
   Ejecuta el siguiente comando para construir la imagen de Docker:
   ```bash
   docker build -t mysql-paneldb .
   ```

2. **Crear y levantar el contenedor**  
   Usa el siguiente comando para crear y levantar el contenedor:
   ```bash
   docker run --name mysql-paneldb-container -d -p 3306:3306 \
     -e MYSQL_ROOT_PASSWORD=pass1234 \
     -e MYSQL_DATABASE=mydb \
     -e MYSQL_USER=angel \
     -e MYSQL_PASSWORD=secret1234 \
     mysql-paneldb
   ```

   - `--name mysql-paneldb-container`: Asigna un nombre al contenedor.
   - `-d`: Ejecuta el contenedor en segundo plano.
   - `-p 3306:3306`: Mapea el puerto 3306 del contenedor al puerto 3306 de tu máquina.
   - `-e MYSQL_ROOT_PASSWORD=pass1234`: Establece la contraseña del usuario root de MySQL.
   - `-e MYSQL_DATABASE=mydb`: Crea una base de datos llamada `mydb`.
   - `-e MYSQL_USER=angel`: Crea un usuario llamado `angel`.
   - `-e MYSQL_PASSWORD=secret1234`: Establece la contraseña del usuario `angel`.

3. **Verificar que el contenedor está corriendo**  
   Ejecuta el siguiente comando para verificar que el contenedor está activo:
   ```bash
   docker ps
   ```

4. **Acceder a la base de datos**  
   Puedes conectarte a la base de datos usando cualquier cliente MySQL. Por ejemplo:
   ```bash
   mysql -h 127.0.0.1 -P 3306 -u angel -p
   ```
   Ingresa la contraseña configurada (`secret1234` en este caso).

5. **Cargar el dump de la base de datos (opcional)**  
   Si necesitas cargar manualmente el dump de la base de datos, usa el siguiente comando:
   ```bash
   docker exec -i mysql-paneldb-container mysql -u angel -p mydb < paneldb_dump.sql
   ```

## Detener y eliminar el contenedor

- Para detener el contenedor:
  ```bash
  docker stop mysql-paneldb-container
  ```

- Para eliminar el contenedor:
  ```bash
  docker rm mysql-paneldb-container
  ```

## Notas adicionales

- Si necesitas modificar la configuración de MySQL, edita el archivo `mysqld.cnf` y reconstruye la imagen.
- Asegúrate de que el puerto 3306 no esté siendo usado por otro servicio en tu máquina.