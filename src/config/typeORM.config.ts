import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  timezone: 'Z',
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'], //[__dirname + '/../**/*.entities{.ts,.js}'],
  synchronize: true,
};
