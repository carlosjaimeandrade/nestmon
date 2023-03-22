import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../../dist/users/models/users.modal';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersModel: Model<User>,
        private readonly authService: AuthService
    ) {}

    
    public async sigup(signupDto: SignupDto): Promise<User> {
        const user = new this.usersModel(signupDto)
        return user.save()
    }

    public async signin(signinDto: SigninDto): Promise<{ name: string, jwtToken: string, email: string }> {
        const user = await this.findByEmail(signinDto.email)
        const match = this.checkPassword(signinDto.password, user)
        if(!match) throw new UnauthorizedException('Invalid credentials')
        
        const jwt = await this.authService.createAcessToken(user._id)

        return {
            name: user.name,
            jwtToken: jwt,
            email: user.email
        }
    }   

    public async findAll(): Promise<User[]> {
        return this.usersModel.find();
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.usersModel.findOne({ email: email })
        if(!user) throw new NotFoundException('Email not found')
        return user;
    }

    public async checkPassword(password: string, user: User): Promise<boolean> {
        const match = await bcrypt.compare(password, user.password) 
        if(!match) throw new UnauthorizedException('Acess invalid')
        return match;
    }

}
