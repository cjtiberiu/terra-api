# Project Setup

## Requirements
1. Node version > 18.7.0
2. NPM version > 8.15.0
3. Docker

## Setup for use
> After last commit some updates are still needed for dev setup. Currently this setup is only for use. npm install can be ignored for now

1. npm install (only for dev)
2. add env variables
```
DB_NAME=
DB_PASSWORD=
DB_USER=
DB_HOST=
APP_PORT=
```
3. docker-compose up --build

- - - -

## Sequelize Commands for Migrations And Seeds
1. npx sequelize seed:generate --name [name] to generate seed file
2. npx sequelize-cli db:migrate to migrate the db structure
3. npx sequelize-cli db:seed:all to add the data


