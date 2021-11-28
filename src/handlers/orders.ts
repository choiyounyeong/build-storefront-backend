import { OrderStore, OrderProductStore } from '../models/order';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders/:id/new', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json('Access denied, invalid token');
  }
};

const index = async (_req: Request, res: Response) => {
  const orders = await orderStore.index();
  res.json(orders);
};

const show = async (_req: Request, res: Response) => {
  const order = await orderStore.show(_req.params.id);
  res.json(order);
};

const create = async (_req: Request, res: Response) => {
  const userId = _req.body.userId;
  const createdOrder = await orderStore.create(userId, 'active');

  if (createdOrder.id) {
    const items = _req.body.items;
    for (const item of items) {
      await orderProductStore.create(
        createdOrder.id,
        item.productId,
        Number(item.quantity)
      );
    }
  } else {
    throw Error('Order cannot be created.');
  }

  res.json(createdOrder);
};

const destroy = async (req: Request, res: Response) => {
  const orderToBeDeleted = await orderStore.show(req.params.id);
  if (!orderToBeDeleted.id)
    throw Error(`Order of id: ${req.params.id} cannot not be deleted`);

  await orderProductStore.deleteAll(orderToBeDeleted.id);
  const deleted = await orderStore.destroy(req.params.id);
  res.json(deleted);
};

export default orderRoutes;
