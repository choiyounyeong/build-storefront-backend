import Client from '../database';

export type Order = {
  id?: string | number;
  product_id: string | number;
  quantity: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  order_id: number;
};

export class OrderStore {
  async index(user_id: number, status: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find the order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Failed to add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }

  async delete(id: string | number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete the order. Error: ${err}`);
    }
  }
}
