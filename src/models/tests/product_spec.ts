import client from '../../database';
import orderRoutes from '../../handlers/orders';
import { ProductStore } from '../product';

const product = new ProductStore();

describe('Product model', () => {
  let createdProductId: number;
  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'DELETE FROM products';
    await conn.query(sql);
  });

  it('should have index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have method create', () => {
    expect(product.create).toBeDefined();
  });

  it('should have method delete', () => {
    expect(product.destroy).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await product.create({
      name: 'Montblanc Wallet',
      price: 230,
    });

    createdProductId = Number(result.id);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual('Montblanc Wallet');
    expect(result.price).toEqual('230.00');
  });

  it('index method should return a list of product', async () => {
    const result = await product.index();
    expect(result.length).toEqual(2);
    expect(result[0].name).toBe('Montblanc Wallet');
  });

  it('show method should return the correct product', async () => {
    const result = await product.show(createdProductId);
    expect(result.name).toBe('Montblanc Wallet');
  });

  it('delete method should remove the product', async () => {
    await product.destroy(createdProductId);
    const result = await product.show(createdProductId);
    expect(result).not.toBeDefined();
  });
});
