import { OrderStore } from '../models/order';
import { OrderProductStore } from '../models/order_product';
import express, { Request, Response } from 'express';

const orderRoutes = (app: express.Application) => {
  app.get('/', index);
  app.get('/orders/:id', show);
  app.post('/orders/:id/products', create);
  app.delete('/orders/:id', destroy);
};

const store = new OrderStore();
const orderstore = new OrderProductStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.params.id);
  res.json(order);
};

const create = async (_req: Request, res: Response) => {
  const newOrder = await orderstore.create(
    _req.params.order_id,
    _req.params.product_id,
    Number(_req.params.quantity)
  );
  res.json(newOrder);
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

export default orderRoutes;
