import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/types';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwtTokens(userDataToken: PayloadToken) {
    const accessToken = this.jwtService.sign(userDataToken, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    const refreshToken = this.jwtService.sign(userDataToken, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
    return { accessToken, refreshToken };
  }

  validateRefreshToken(token: string): PayloadToken {
    const userDataToken: PayloadToken = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_REFRESH,
    });
    return userDataToken;
  }

  async findToken(refreshToken: string): Promise<TokenEntity> {
    return await this.tokenRepository.findOneBy({ refreshToken });
  }

  async saveToken(refreshToken: string, userId: number) {
    const user = await this.usersService.findUserById(userId);
    const token = await this.tokenRepository
      .createQueryBuilder('token')
      .where('token.userId = :id', { id: userId })
      .leftJoinAndSelect('token.user', 'user')
      .getOne();
    token
      ? await this.tokenRepository.update({ id: token.id }, { refreshToken })
      : await this.tokenRepository.save({
          refreshToken,
          user,
        });
  }

  async removeToken(refreshToken: string): Promise<string> {
    await this.tokenRepository.delete({ refreshToken });
    return 'Видалено';
  }
}
