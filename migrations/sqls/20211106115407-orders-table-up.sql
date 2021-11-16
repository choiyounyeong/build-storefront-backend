CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity INTEGER,
    user_id bigint REFERENCES users(id),
    status status
);