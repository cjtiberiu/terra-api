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
DEFAULT_USER_PASSWORD= (this is the default password that will be used when a new account will be created from admin interface)
JWT_TOKEN= add a jwt pasword, this will be used for crypt and decrypt
ADMIN_USER_EMAIL= (set data for the first admin user that will control the app, same for the admin variables below, this data will be used in React)
ADMIN_USER_FIRSTNAME=
ADMIN_USER_LASTNAME=
ADMIN_USER_PASSWORD=
```
3. docker-compose up --build (use --build only the first time and if Dockerfile code changes)


### Known Bugs
- at first docker build, the database refuses the app connection so we need to run it a second time
- sometimes the database refuses the app connection so we need to run docker-compose up multiple times
- - - -

## Sequelize Commands for Migrations And Seeds
1. npx sequelize seed:generate --name [name] to generate seed file
2. npx sequelize-cli db:migrate to migrate the db structure
3. npx sequelize-cli db:seed:all to add the data


