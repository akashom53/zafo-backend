import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        return { token: req.user }
    }

    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request) {
        console.log(req.user)
    }
}
