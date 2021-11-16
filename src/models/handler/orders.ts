import { Order, OrderStore } from '../order';
import express, { Request, Response } from 'express';

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/oders', create);
  app.post('orders/:id/products', addProduct);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (_req: Request, res: Response) => {
  console.log(_req.params);
  const order = await store.show(_req.params.id);
  res.json(order);
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: 'active',
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }

  const addProduct = async (_req: Request, res: Response) => {
    const order_id: string = _req.params.id;
    const product_id: string = _req.params.product_id;
    const quantity: number = parseInt(_req.body.quantity);

    try {
      const addProduct = await store.addProduct(quantity, order_id, product_id);
      res.json(addProduct);
    } catch (err) {
      res.send(400);
      res.json(err);
    }
  };
};

export default orderRoutes;
