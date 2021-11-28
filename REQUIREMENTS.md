# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products/:id/new' [POST]
- Delete [token required]: '/products/:id' [DELETE]

#### Users

- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create [token required]: '/users/:id/new' [POST]

#### Orders

- Index [token required]: '/orders' [GET]
- Show [token required]: '/orderss/:id' [GET]
- Create [token required]: '/orders/:id/new' [POST]
- Delete [token required]: '/orders/:id' [DELETE]

## Data Shapes

#### products

- id SERIAL PRIMARY KEY
- name VARCHAR(50)
- price DECIMAL(10,2)

#### users

- id SERIAL PRIMARY KEY
- firstName VARCHAR(50)
- lastName VARCHAR(50)
- password VARCHAR(255)

#### orders

- id SERIAL PRIMARY KEY
- user_id bitint REFERENCES users(id)
- status status (CREATE TYPE status AS ENUM ('active', 'complete');)

#### order_products

- id SERIAL PRIMARY KEY
- order_id bigint REFERENCES orders(id)
- product_id bigint REFERENCES products(id)
- quantity INTEGER
