FROM node:8
# this new image will be create from parent image = node:8 (stable)

# Create app directory inside docker image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY  package*.json  ./

RUN npm install


# Bundle app source (src, dist, ...)
COPY .   .

#setting ENV-VARIABLE
ENV PORT=8282

EXPOSE 8282
#CMD [ "npm", "start" ]
CMD [ "npm", "run" , "start_noDB" ]
