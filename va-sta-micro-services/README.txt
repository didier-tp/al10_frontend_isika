Phase de mise au point :
==============
cd /vagrant
cd conf-docker
cd backend-api
./build-docker-image.sh
cd ..
cd frontend
./build-docker-image.sh
cd ..

docker image ls

docker network create --driver bridge mynetwork

docker run -p 8282:8282 -d --name backend-api-container --network mynetwork --network-alias=backend.api.service conf-docker_backend-api
docker container ls
curl http://localhost:8282/devise-api/public/devise
--> test via http://localhost:8282/test-ws.html
docker container stop backend-api-container
docker container rm backend-api-container


docker run -p 80:80 -d --network mynetwork --name frontend-container conf-docker_frontend
docker container ls
curl http://localhost:80/index.html 
curl http://localhost:80/devise-api/public/devise
--> test via http://localhost:80/index.html 

docker container  rm -f backend-api-container
docker container  rm -f frontend-container
docker network rm mynetwork
docker image rm conf-docker_backend-api
docker image rm conf-docker_frontend

==============
cd conf-docker (là ou est docker-compose.yml)
docker-compose up &
docker-compose down

=========
pour debug docker (si nécessaire):

docker events &
docker run  ....
docker logs id-of-container

