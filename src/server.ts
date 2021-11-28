import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';

const app = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to online store!');
});

orderRoutes(app);
productRoutes(app);
userRoutes(app);

app.listen(3000, async () => {
  console.log(`starting app on: ${address}`);
});

export default app;
