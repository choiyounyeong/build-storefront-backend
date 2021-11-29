import app from '../../server';
import supertest from 'supertest';
import client from '../../database';

const request = supertest(app);
let token: string;
let userId: string;

describe('users API', () => {
  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'DELETE FROM users';
    await conn.query(sql);
  });

  it('response from the GET /users API without token should be 401', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('response from the POST /users/new API should be 200', async () => {
    const response = await request.post('/users/new').send({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'Password123',
    });
    expect(response.status).toBe(200);
  });

  it('response from the POST /authenticate API should be 200', async () => {
    const response = await request.post('/users/authenticate').send({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'Password123',
    });
    expect(response.status).toBe(200);
    token = response.body as string;
  });

  it('response from the GET /users API should be 200', async () => {
    const response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('authorization', token);
    const users = response.body;
    expect(response.status).toBe(200);
    expect(users.length).toBe(1);
    userId = users[0].id;
    expect(userId).toBeDefined();
  });

  it('response from the GET /users/:id API should be 200', async () => {
    const response = await request
      .get(`/users/${userId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('response from the DELETE /users/:id API should be 200', async () => {
    const response = await request
      .delete(`/users/${userId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });
});

describe('products API', () => {
  let productId: string;
  beforeAll(async () => {
    const response = await request.post('/users/new').send({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'Password123',
    });
    token = response.body as string;
  });
  afterAll(async () => {
    const conn = await client.connect();
    let sql = 'DELETE FROM products';
    await conn.query(sql);

    sql = 'DELETE FROM users';
    await conn.query(sql);
  });

  it('response from the GET /products API should be 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('response from the POST /products/new API should be 200', async () => {
    const response = await request
      .post('/products/new')
      .send({
        name: 'Pen',
        price: 15,
      })
      .set('Content-type', 'application/json')
      .set('authorization', token);
    expect(response.status).toBe(200);
    productId = response.body.id;
  });

  it('response from the GET /products/:id API should be 200', async () => {
    const response = await request
      .get(`/products/${productId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(200);
  });

  it('response from the DELETE /products/:id API should be 200', async () => {
    const response = await request
      .delete(`/products/${productId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(200);
  });
});

describe('orders API', () => {
  let userId: string;
  let productId: string;
  let orderId: string;
  beforeAll(async () => {
    const response1 = await request.post('/users/new').send({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'Password123',
    });
    token = response1.body as string;

    const response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('authorization', token);
    const users = response.body;
    userId = users[0].id;

    const response2 = await request
      .post('/products/new')
      .send({
        name: 'Pen',
        price: 15,
      })
      .set('Content-type', 'application/json')
      .set('authorization', token);
    productId = response2.body.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    let sql = 'DELETE FROM products';
    await conn.query(sql);

    sql = 'DELETE FROM users';
    await conn.query(sql);

    sql = 'DELETE FROM orders';
    await conn.query(sql);

    sql = 'DELETE FROM order_products';
    await conn.query(sql);
  });

  it('response from the POST /orders/new API should be 200', async () => {
    const response = await request
      .post('/orders/new')
      .send({
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: 5,
          },
        ],
      })
      .set('Content-type', 'application/json')
      .set('authorization', token);
    expect(response.status).toBe(200);
    orderId = response.body.id;
  });

  it('response from the GET /orders API should be 200', async () => {
    const response = await request
      .get('/orders/')
      .set('Content-type', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(200);
  });

  it('response from the GET /orders/:id API should be 200', async () => {
    const response = await request
      .get(`/orders/${orderId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(200);
  });

  it('response from the DELETE /orders/:id API should be 200', async () => {
    const response = await request
      .delete(`/orders/${orderId}`)
      .set('Content-type', 'application/json')
      .set('authorization', token);

    expect(response.status).toBe(200);
  });
});
