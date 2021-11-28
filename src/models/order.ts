import client from '../database';

export type Order = {
  id?: string | number;
  user_id: string | number;
  status: string;
};

export type OrderProduct = {
  id?: string | number;
  quantity: number;
  product_id: string | number;
  order_id: string | number;
};

export class OrderStore {
  async create(user_id: string | number, status: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `User : ${user_id} failed to add an order. Error: ${err}`
      );
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find the orders. Error: ${err}`);
    }
  }

  async show(user_id: string | number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = ($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find the order. Error: ${err}`);
    }
  }

  async destroy(id: string | number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete the order. Error: ${err}`);
    }
  }
}

export class OrderProductStore {
  async create(
    order_id: string | number,
    product_id: string | number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Failed to add product ${product_id} to order ${order_id}. Error: ${err}`
      );
    }
  }

  async deleteAll(order_id: string | number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM order_products WHERE order_id = ($1)';
      await conn.query(sql, [order_id]);
      conn.release();
    } catch (err) {
      throw new Error(
        `Failed to delete order details for order id: ${order_id}. Error: ${err}`
      );
    }
  }
}
