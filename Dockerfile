FROM node:14-slim

# Create app directory
WORKDIR /tripsterag

# Install app dependencies
COPY package.json /tripsterag/
RUN npm install
RUN npm install ldapjs

# Bundle app source
COPY . /tripsterag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
