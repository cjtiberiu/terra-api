# Project Setup

## Requirements
1. Node version > 18.7.0
2. NPM version > 8.15.0

- - - -
## Database Info
This project is using mySQL db. Created and linked two docker containers for mySql and phpMyAdmin.

- - - -
## Sequelize Commands for Migrations And Seeds
1. npx sequelize seed:generate --name [name] to generate seed file
2. npx sequelize-cli db:migrate to migrate the db structure
3. npx sequelize-cli db:seed:all to add the data


