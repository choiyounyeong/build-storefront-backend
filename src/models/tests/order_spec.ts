import { Order, OrderStore } from '../order';

const order = new OrderStore();

describe('Order model', async () => {
  it('should have index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have method delete', () => {
    expect(order.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await order.index({
      name: 'Montblanc Wallet',
      price: 230,
    });

    expect(result.id).toBeDefined();
    expect(result.name).toEqual('Montblanc Wallet');
    expect(result.price).toEqual('230');
  });

  it('delete method should remove the book', async () => {
    order.delete('1');
    const result = await product.index();

    expect(result).toEqual([]);
  });
});
