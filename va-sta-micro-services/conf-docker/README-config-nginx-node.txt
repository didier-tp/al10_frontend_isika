docker-compose build
docker-compose up
----------------
nginx sera ulisé en front 
nginx aura 80 comme port interne et par exemple 80 comme port externe
-----
http://localhost:80 (interne  vm , 
http://localhost:80 ou autre depuis le host selon Vagrantfile)
-------
au sein de docker-compose.yml ,
"mynetwork" correspond à un réseau docker permettant de faire fonctionner
ensemble les 2 ou 3 conteneurs dockers "frontend" , "backend-api" (et "db" ).