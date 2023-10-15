FROM node:carbon-slim

# Create app directory
WORKDIR /tripsterag

# Install app dependencies
COPY package.json /tripsterag/
RUN npm install

# Bundle app source
COPY . /tripsterag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
