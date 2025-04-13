import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.username)
        if (user && loginDto.password == user!.password) {
            return this.jwtService.sign({ ...user, password: '' })
        }
    }
}
