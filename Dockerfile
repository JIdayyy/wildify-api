# pull the Node.js Docker image
FROM node:14.17.6-alpine

# create the directory inside the container

WORKDIR /usr/src/

# copy the package.json files from local machine to the workdir in container
COPY package*.json .

# run npm install in our local machine
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN npm install



# copy the generated modules and all other files to the container
COPY . .


# our app is running on port 5000 within the container, so need to expose it
EXPOSE 4000

# the command that starts our app
CMD ["npm", "run", "deploy"]