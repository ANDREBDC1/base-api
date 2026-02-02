import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = process.env.NODE_ENV === 'production' 
  ? {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    logging: true,
  }
  : {
     type: 'sqlite',
      database: 'database.sqlite',
      synchronize: false,
      migrationsRun: false,
      migrations: ['src/**/*.entity{.ts,.js}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
  };

export const dataSource = new DataSource(dataSourceOptions);