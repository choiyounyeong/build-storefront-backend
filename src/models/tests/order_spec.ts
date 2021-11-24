import { Order, OrderStore } from '../order';

const order = new OrderStore();

describe('Order model', async () => {
  it('should have index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have method addProduct', () => {
    expect(order.addProduct).toBeDefined();
  });

  it('should have method delete', () => {
    expect(order.delete).toBeDefined();
  });

  it('addProduct method should add a product', async () => {
    const result = await order.addProduct(1, 'firstorder', 'firstitem');

    expect(result.quantity).toEqual(1);
    expect(result.order_id).toEqual('firstorder');
    expect(result.product_id).toEqual('firstitem');
  });

  it('delete method should remove the book', async () => {
    order.delete('1');

    const result = await product.index();
    expect(result).toEqual([]);
  });
});
