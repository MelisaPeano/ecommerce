import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // convierto el puerto a número(tipado)
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // solo en desarrollo, modifico la DB automaticamente
  //dropSchema: true,
  logging: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: false,
};
export default registerAs('typeorm', () => config);

export const conectionSource = new DataSource(config);
