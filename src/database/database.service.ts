import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  async conectar(host: string, port: number, database: string, user: string, password: string) {
    this.pool = new Pool({
      host,
      port,
      database,
      user,
      password,
    });

    // Testar conexão
    const client = await this.pool.connect();
    client.release();
  }

  async executarQuery(sql: string) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async desconectar() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
