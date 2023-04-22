import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TokenEntity } from './entities/token.entity';
import { TokensService } from './tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), UsersModule],
  providers: [TokensService, JwtService],
  exports: [TokensService],
})
export class TokensModule {}
