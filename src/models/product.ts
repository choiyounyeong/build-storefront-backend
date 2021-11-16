import Client from '../database';

export type Product = {
  id?: string | number;
  name: string | number;
  price: string | number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products. Error: ${err}`);
    }
  }

  async show(id: string | number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM prodcuts WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannnot find the product. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO prodcuts (name, price) VALUES ($1, $2)';
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to add the product. Error: ${err}`);
    }
  }

  async delete(id: string | number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM prodcuts WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete the product. Error: ${err}`);
    }
  }
}
