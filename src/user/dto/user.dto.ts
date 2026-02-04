import { IsEmail, IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UserDto {
    
    @IsNotEmpty()
    name: string

    @IsEmail()
    email?: string;
    
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    isActive?: boolean;
    
    @IsOptional()
    isAdmin: boolean;
}
