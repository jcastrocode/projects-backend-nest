import { PickType } from '@nestjs/mapped-types';
import { MaxLength, MinLength, IsEmail } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class LoginAuthDto extends PickType(UserEntity, [
    'email',
    'password',
  ])  {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
