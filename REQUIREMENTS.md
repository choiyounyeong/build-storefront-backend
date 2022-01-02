# API Requirements

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products/new' [POST]
- Destroy [token required]: '/products/:id' [DELETE]

#### Users

- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create: '/users/new' [POST]
- Authenticate [token required]: '/users/authenticate' [POST]
- Destroy [token required]: '/users/:id' [DELETE]

#### Orders

- Index [token required]: '/orders' [GET]
- Show [token required]: '/orderss/:id' [GET]
- Create [token required]: '/orders/new' [POST]
- Destroy [token required]: '/orders/:id' [DELETE]

## Data Shapes

#### products

- id
- name of product
- price
- url
- description

```
Table: products (id: SERIAL PRIMARY KEY, name: VARCHAR(50), price: DECIMAL(10,2), url: VARCHAR(255), description: VARCHAR(255))
```

#### users

- id
- firstname
- lastname
- password

```
Table: users (id: SERIAL PRIMARY KEY, firstname: VARCHAR(50), lastname: VARCHAR(50), password: VARCHAR(255))
```

#### orders

- id
- user_id
- status of order(active or complete)

```
Table: orders (id: SERIAL PRIMARY KEY, user_id: bitint REFERENCES users(id), status: ENUM ('active', 'complete'))
```

#### order_products

- id
- order_id
- product_id
- quantity

```
Table: order_products (id: SERIAL PRIMARY KEY, order_id: bigint REFERENCES orders(id), product_id: bigint REFERENCES products(id), quantity: INTEGER)
```
