# Use the official Node.js image as the base image
FROM node:18.7.0 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) for installing dependencies
COPY package*.json ./

# Copy the .env file
COPY .env ./

# Copy the .env file
COPY tsconfig.json ./

# Install dependencies - include devDependencies for building the TypeScript project
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build your TypeScript
RUN npm run build

# Install sequelize-cli inside container
RUN npm install -g sequelize-cli

# Production stage: Use a new base image without devDependencies
FROM node:18.7.0

# Set the working directory in the new stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for production dependencies
COPY package*.json ./

# Copy the .env file
COPY .env ./

# Specifically copy the .sequelizerc-docker file and rename it to .sequelizerc
COPY .sequelizerc-docker /usr/src/app/.sequelizerc

# Copy db seeds and migrations
COPY /src/db ./dist/db

# Install only production dependencies
RUN npm ci --only=production

# Copy the built JavaScript from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Set the command to start your app
CMD ["node", "dist/index.js"]
