import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(registerUser: RegisterAuthDto) {
    const { password, ...rest } = registerUser;
    const plainToHash = await hash(password, 10);
    registerUser = { ...rest, password: plainToHash };
    return this.prismaService.user.create({ data: registerUser });
  }

  async login(loginUser: LoginAuthDto) {
    const { email, password } = loginUser;
    const user = await this.findUserByEmail(email);
    this.validateUser(user);

    await this.validatePassword(password, user.password);

    const token = this.generateToken(user);
    const data = { token, user};

    return data;
  }

  private async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user;
  }

  private validateUser(user: any) {
    if (!user) {
      throw new HttpException('User not found', 404);
    }
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isPasswordValid = await compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 401);
    }
  }

  private generateToken(user: any) {
    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
