import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // รับ Token จาก Header Authorization
            ignoreExpiration: false, // ถ้าหมดอายุ ให้ดีดออกทันที (401 Unauthorized)
            secretOrKey: configService.get<string>('JWT_SECRET') || 'secret', // ใช้ Key เดียวกับตอนเซ็น
        });
    }

    async validate(payload: any) {
        // ค่าที่ return ตรงนี้จะถูกใส่เข้าไปใน request.user อัตโนมัติ
        return { id: payload.sub, email: payload.username, role: payload.role };
    }
}