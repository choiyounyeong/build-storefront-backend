import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('users API', () => {
  it('response from the /users API should be 200', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });
  it('response from the /users/:id API should be 200', async () => {
    const response = await request.get('/users/:id');
    expect(response.status).toBe(200);
  });
  it('response from the /users/:id/new API should be 200', async () => {
    const response = await request.get('/users/:id/new');
    expect(response.status).toBe(200);
  });
});

describe('products API', () => {
  it('response from the /products API should be 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('response from the /products/:id API should be 200', async () => {
    const response = await request.get('/products/:id');
    expect(response.status).toBe(200);
  });
  it('response from the /products/:id/new API should be 200', async () => {
    const response = await request.get('/products/:id/new');
    expect(response.status).toBe(200);
  });
});

describe('orders API', () => {
  it('response from the /orders API should be 200', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });
  it('response from the /orders/:id API should be 200', async () => {
    const response = await request.get('/orders/:id');
    expect(response.status).toBe(200);
  });
  it('response from the /orders/:id/new API should be 200', async () => {
    const response = await request.get('/orders/:id/new');
    expect(response.status).toBe(200);
  });
});
