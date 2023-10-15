# Tripster API Gateway - GraphQL

Este repositorio contiene un API Gateway implementado con GraphQL que sirve como punto de entrada para interactuar con los microservicios subyacentes.

## Construir el Contenedor Docker

Para ejecutar el API Gateway en un contenedor Docker, sigue estos pasos:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/felipeperezleal/tripster_ag.git
   cd tu-repo
   ```
  
2. Construye el contenedor Docker utilizando el comando docker build. Asegúrate de que estás en el directorio raíz del proyecto donde se encuentra el archivo Dockerfile:
   ```bash
   docker build -t apigw .
   ```
   
3. Ejecutar el Contenedor Docker
    ```bash
    docker run --name tripster-ag -p 5000:5000 apigw
    ```

4. Acceder al API Gateway
  Una vez que el contenedor esté en funcionamiento, puedes acceder al API Gateway a través de la URL http://localhost:5000/graphiql
