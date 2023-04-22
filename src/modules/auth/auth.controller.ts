import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthResponse } from 'src/types';
import { CreateSuperUserDTO, CreateUserDTO } from 'src/modules/users/dto';
import { AuthService } from './auth.service';
import { LoginSuperUserDTO, LoginUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() dto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userData = await this.authService.registerUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('register_su')
  async registerSuperUser(
    @Body() dto: CreateSuperUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userData = await this.authService.registerSuperUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('login')
  async loginUser(
    @Body() dto: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userData = await this.authService.loginUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('login_su')
  async loginSuperUser(
    @Body() dto: LoginSuperUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userData = await this.authService.loginSuperUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const { refreshToken } = req.cookies;
    const response = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return response;
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { refreshToken } = req.cookies;
    const response = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', response.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('user')
  // async updateUser(
  //   @Body() dto: CreateUserDTO,
  //   @UserId() id: number,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<AuthResponse> {
  //   const userData = await this.authService.updateUser(id, dto);
  //   res.cookie('refreshToken', userData.refreshToken, {
  //     maxAge: 60 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return userData;
  // }
}
