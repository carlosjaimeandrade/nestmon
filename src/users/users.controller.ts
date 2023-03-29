import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './models/users.modal';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signup(@Body() signupDto: SignupDto): Promise<User>{
        return this.userService.signup(signupDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signin(@Body() signinDto: SigninDto): Promise<{ name: string, jwtToken: string, email: string }>{
        return this.userService.signin(signinDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async finAll(): Promise<User[]> {
        return this.userService.findAll();
    }

}
