FROM node:carbon

#run npm i npm@latest -g
#WORKDIR /usr/src/app/

#COPY . /usr/src/app/
 
#RUN npm i npm@latest -g 
#RUN npm install
WORKDIR /usr/src/app/

EXPOSE 3000
#EXPOSE 5858

#WORKDIR /usr/src/app 
#RUN ls 
#CMD ["node","--debug=5858", "/build/app.js"]


#----------------------------------------------------------
#docker build -t jkd  .
#docker run -d -p 3000:3000 -p 5858:5858 jkd
#docker run -it jkd bash