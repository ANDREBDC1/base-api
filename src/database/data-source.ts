import { DataSource, DataSourceOptions } from 'typeorm';

console.log(__dirname)
console.log(process.env.NODE_ENV)
export const dataSourceOptions: DataSourceOptions = (process.env.NODE_ENV || 'dev') === 'production' 
  ? {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: true,
  }
  : {
    type: 'sqlite',
    database: 'database3.sqlite',
    synchronize: false,
    migrationsRun: true,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: true,
  };

export const dataSource = new DataSource(dataSourceOptions);