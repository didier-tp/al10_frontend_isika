FROM nginx

#adding ping and curl command for debug via docker run -it .... /bin/bash
RUN apt-get update && apt-get install -y iputils-ping && apt-get install -y curl

#copy angular app :
COPY /dist/my-app /usr/share/nginx/html

#copy docker-nginx.conf for reverse-proxy devise-api (node/express or springBoot)
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
