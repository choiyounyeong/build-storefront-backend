# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]

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
- product_id bigint REFERENCES products(id)
- quantity INTEGER
- user_id bitint REFERENCES users(id)
- status status (CREATE TYPE status AS ENUM ('active', 'complete');)

#### order_products

- id SERIAL PRIMARY KEY
- order_id bigint REFERENCES orders(id)
- product_id bigint REFERENCES products(id)
