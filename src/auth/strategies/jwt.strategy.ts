import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt'
import { User } from "src/users/models/users.modal";
import { AuthService } from "../auth.service";
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            igonreExpiration: false,
            secretOrkey: process.env.JWT_SECRET
        })
    }

    async validate(jwtPayload: JwtPayload): Promise<User> {
        const user = this.authService.validateUser(jwtPayload)
        if(!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}