import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PermissionsGuard } from './permissions.guard';
import { PermissionAdmin } from "./allPermissions"
import { Permissions } from "./permissions.decorator"
import { PermissionDto } from './dto/permisson.dto';


@UseGuards(JwtStrategy, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService
    ) { }

    @Permissions(PermissionAdmin)
    @Get()
    getAll() {
        return this.permissionsService.getPermissons();
    }

    @Permissions(PermissionAdmin)
    @Post()
    Create(dto: PermissionDto) {
        return this.permissionsService.create(dto);
    }

    @Permissions(PermissionAdmin)
    @Put(':userId')
    update(
        @Param('userId') userId: string,
        @Body() dto: PermissionDto,
    ) {
        return this.permissionsService.update(userId, dto);
    }


}
