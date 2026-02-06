import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { PermissionsService } from 'src/security/permissions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly permissionsService: PermissionsService
  ) {}

  async create(dto: UserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      email: dto.email,
      password: passwordHash,
    });

    const newUser  = await this.userRepository.save(user)

    if(dto.permissions.length > 0){
        const permisionsDto = dto.permissions.map(permisssao => {
          permisssao.userId =  newUser.id
          return permisssao;
        })
       await this.permissionsService.create(permisionsDto)
    }
  
    return newUser;
  }

  async findAll() {
    return await this.userRepository.find({
      where:{
        isAdmin: false
      }
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password, ...result } = user;
    return result;
  }

  async update(id: string, dto: UserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.remove(user);

    return { message: 'Usuário removido com sucesso' };
  }
}