import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionsGuard } from './permissions.guard';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsGuard, PermissionsService],
  exports: [PermissionsGuard, PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule {}
