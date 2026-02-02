import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'
import { PermissionsModule } from "./security/permissions.module"
import { UsersModule } from './user/user.module'



const dataSourceOptions: TypeOrmModuleOptions = process.env.NODE_ENV === 'production' 
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
    migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
    logging: true,
  }
  : {
     type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      migrationsRun: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
      logging: true,
  };

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
