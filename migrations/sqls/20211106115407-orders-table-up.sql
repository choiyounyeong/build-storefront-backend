CREATE TYPE status AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status status
);