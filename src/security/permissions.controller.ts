import { Body, Controller, Get, Param, Post, Put, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';
import { PermissionAdmin } from "./allPermissions"
import { Permissions } from "./permissions.decorator"
import { PermissionDto } from './dto/permisson.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard, PermissionsGuard)
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
    @HttpCode(HttpStatus.CREATED)
    Create(@Body() dto: PermissionDto[]) {
        return this.permissionsService.create(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Permissions(PermissionAdmin)
    @Put(':userId')
    update(
        @Param('userId') userId: string,
        @Body() dto: PermissionDto,
    ) {
        return this.permissionsService.update(userId, dto);
    }


}
