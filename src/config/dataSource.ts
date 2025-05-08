import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    database: configService.get<string>('DB_NAME'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    entities: ['dist/**/*.entity.{ts,js}'],
  };
};

ConfigModule.forRoot();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'clients',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/shared/database/migrations/*.{ts,js}'],
  synchronize: false,
};

const dataSource = new DataSource(options);

export default dataSource;
