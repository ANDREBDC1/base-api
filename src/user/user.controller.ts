import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './user.service';
import { UserDto }  from './dto/user.dto';
import { PermissionsGuard } from 'src/security/permissions.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permissions } from "../security/permissions.decorator"
import  { PermissionAdmin } from "../security/allPermissions"

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(PermissionAdmin)
  create(@Body() dto: UserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Permissions(PermissionAdmin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Permissions(PermissionAdmin)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Permissions(PermissionAdmin)
  update(
    @Param('id') id: string,
    @Body() dto: UserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Permissions(PermissionAdmin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
