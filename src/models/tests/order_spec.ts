import { OrderStore, OrderProductStore } from '../order';
import client from '../../database';
import { UserStore } from '../user';
import { ProductStore } from '../product';

const user = new UserStore();
const product = new ProductStore();
const order = new OrderStore();
const orderProduct = new OrderProductStore();

describe('Order model', () => {
  let createdOrderId: string;
  let userId: string;
  beforeAll(async () => {
    const createdUser = await user.create({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'password0000',
    });
    userId = String(createdUser.id);
  });
  afterAll(async () => {
    const conn = await client.connect();
    let sql = 'DELETE FROM orders';
    await conn.query(sql);

    sql = 'DELETE FROM users';
    await conn.query(sql);
  });

  it('should have create method', () => {
    expect(order.create).toBeDefined();
  });

  it('should have index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have destroy method', () => {
    expect(order.destroy).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await order.create(userId, 'active');

    createdOrderId = String(result.id);

    expect(result.id).toBeDefined();
    expect(result.user_id).toEqual(userId);
    expect(result.status).toEqual('active');
  });

  it('destroy method should remove the order', async () => {
    order.destroy(createdOrderId);
    const result = await order.index();

    expect(result).toEqual([]);
  });
});

describe('OrderProduct model', () => {
  let createdOrderId: string;
  let userId: string;
  let productId1: string;
  beforeAll(async () => {
    // Create user
    const createdUser = await user.create({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'password0000',
    });
    userId = String(createdUser.id);

    // Create Products
    const p1 = await product.create({
      name: 'Montblanc Wallet',
      price: 230,
    });

    productId1 = String(p1.id);

    // Create Order
    const createdOrder = await order.create(userId, 'active');
    createdOrderId = String(createdOrder.id);
  });
  afterAll(async () => {
    const conn = await client.connect();

    let sql = 'DELETE FROM order_products';
    await conn.query(sql);

    sql = 'DELETE FROM orders';
    await conn.query(sql);

    sql = 'DELETE FROM users';
    await conn.query(sql);
  });

  it('should have create method', () => {
    expect(orderProduct.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result1 = await orderProduct.create(createdOrderId, productId1, 1);
    expect(result1.product_id).toEqual(productId1);
    expect(result1.order_id).toEqual(createdOrderId);
    expect(result1.quantity).toEqual(1);
  });
});
