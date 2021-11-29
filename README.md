# Storefront Backend Project

# Description

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

# Steps to Completion

## 1. Setup Database

We will use Postgres for the database.

1. Create User

```
CREATE USER storefront_user WITH PASSWORD 'password123';
```

2. Create Database for dev and test

```
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

3. Grant all privileges

```
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO shopping_user;
```

## 2. Migrate Database

```
db-migrate up
```

## 3. Setup Workspace

1. Install dependenties

Let's start with installing all of the dependencies. Execute the following command from the root folder.

```
$ npm install
```

Please confirm typescript, pg, jsonwebtoken, express, dotenv, db-migrate, db-migrate-pg, body-parser, bcrypt, jasmine, jasmine-spec-reporter, jasmine-ts, ts-node, and tsc-watch are successfully installed.

2. Create .env file

Create a .env file based on the settings below.

```
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = storefront
POSTGRES_TEST_DB = storefront_test
POSTGRES_USER = storefront_user
POSTGRES_PASSWORD = password123
BCRYPT_PASSWORD = my-secret-password
SALT_ROUNDS = 10
TOKEN_SECRET = alohaoe123
ENV=test
```

## 4. Test application

1. Run jasmine test to check the application works properly.

```
npm run test
```

## 5. Start application

1. Compile and run the application.

```
npm run watch
```

The server will start on port 3000.
Regarding all the endpoint, refer to REQUIREMENT.md file.
