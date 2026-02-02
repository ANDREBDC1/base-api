import { Injectable, NotFoundException } from '@nestjs/common';
import { AllPermissions } from './allPermissions';
import { PermissionDto } from './dto/permisson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) { }

    getPermissons() {
        return new AllPermissions().permissions;
    }

    async create(dto: PermissionDto) {

        const permission = this.permissionRepository.create({
            ...dto
        });

        return await this.permissionRepository.save(permission);
    }

    async update(userId : string, dto: PermissionDto) {

        const permission = await this.permissionRepository.findOne({
            where: { userId: userId },
        });

        if (!permission) {
            throw new NotFoundException('permissão não encontrado');
        }

        permission.isActive = dto.isActive;
        return await this.permissionRepository.save(permission);
    }

    async validatePermissions(userId: string, requiredPermissions: string[]) {

        return await this.permissionRepository.count({
              where: {
                userId,
                tipo: In(requiredPermissions),
                isActive: true
              },
            });
    }


}
