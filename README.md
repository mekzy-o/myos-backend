# Myos Backend

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#features-implemented)
- [Working Routes](#working-routes)
- [Assumption made (Thought process)](#assumptions-made(thought-process))
- [Improvements to be made](#assumption-to-be-made)
- [Requirement not covered](#requirement-not-covered)
- [License](#license)

# Introduction

This is a RESTful API for a simple cart service. 
### **Style guide**

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Project Structure

```bash
├── src
    ├── components
        ├── auth
        ├── cart
        ├── product
        ├── user
    ├── database
    ├── lib
    ├── typings
        ├── express
├── .env.sample
├── .gitignore
├── .sequelizerc
├── package.json
├── README.json
├── tsconfig.json
└── yarn.lock
```

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `New Resource` The request was successful and created a new resource
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

## Features Implemented

### Authentication APIs
- Users can sign up.
- Users can login.

### Product API
- Users can get product lisitings
- Users can search product by title and description

### Checkout Process APIs
- Users can add product to cart
- Users can remove product from cart
- Users can get cart items
- Users can initiate cart checkout process


# Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/) v4.16. It has the following dependencies:

- [Node.js `>=` 12.18.3](https://nodejs.org/en/download)
- [PostgreSQL Database](https://www.postgresql.org/download/)
- [Sequelize]((https://www.postgresql.org/download/))
- Mocha & Chai
- ESLint & Prettier

#### _Prerequisites_

- Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

### Getting the Source

You can clone this project directly using this command:

```sh
git clone https://github.com/mekzy-o/myos-backend.git
```

### Installation & Usage

- Create a PostgreSQL database by running the `cmd` below:

```sh
createdb -h localhost -p 5432 -U postgres <database_name>
```

- After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```

- Install the dependencies

```sh
yarn install
```

- Run database migrations

```sh
yarn run db:migrate
```

- You can run the development server using

```sh
yarn run start:dev
```


- Other `yarn` scripts are also available for handling database migrations and database seeding:
  - `yarn run db:migrate` runs script that is responsible for creating tables and their columns in the database,
  - `db:migrate:undo`: undoes the effect of `npm run db:migrate`,
  - `db:reset`: undoes all the migrations, then runs migration on the database,
  - `db:seed`: responsible for seeding records in the database,

# Working Routes

## _API Endpoints_

- Public API documentation of this project is available on [postman docs](https://documenter.getpostman.com/view/6464518/UyxqC3iA)

| Endpoint                                     |                Functionality                | HTTP method |
| -------------------------------------------- | :-----------------------------------------: | ----------: |
| /api/v1/users/register                       |            Create a user account            |        POST |
| /api/v1/users/login                         |                Login a user                 |        POST |
| /api/v1/products                          |                Get All Product Listing             |         GET |
| /api/v1/products?title=title&description='description'                      |            Search Books by Title and Description              |         GET |
| /api/v1/carts                                 |            Add Items to cart             |         POST |
| /api/v1/carts/:cartId     | Get A Cart and Items in it |         GET |
| /api/v1/carts/:cartId/products/:productId                         |      Remove a single product from cart       |         DELETE|
| /api/v1/carts/:cartId/checkout |               Checkout Cart               |         GET |



# Assumptions made (Thought process)
- Admins are not required for this MVP, hence every logged-in user can perform all actions
- Since there are no admins to add products. I created a seed data with each of products with each asset image file (hosted on cloudinary) (this can be found in my `src/database/seeders`).
- I did not authenticate product listings and product search routes, this needs to be available to non-logged in users.
- I assumed only users that are logged-in would be able to access cart, this may not be optimal and can be improved.
- There are no payment gateway integration, so Check-Out process displays a summary showing total amount, cart id and user id
- An order is created in the order table on successful Check-Out

# Improvements that can be made
- non-logged in users should be able to access cart
- Redis can be used as a store to persist cart. This would reduce the latency of read/write operations to the database
- Checkout process can be optimized



## License :boom:

This project is under the MIT LICENSE