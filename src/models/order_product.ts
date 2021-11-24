import client from '../database';

export type OrderProduct = {
  id?: string | number;
  quantity: number;
  product_id: string | number;
  order_id: string | number;
};

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
}
