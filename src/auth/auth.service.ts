import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "nestjs-prisma";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,  // Заменяем Repository на PrismaService
        private jwtService: JwtService,
    ) {
    }

    async register(username: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return user;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({where: {username}});
        if (user && (await bcrypt.compare(password, user.password))) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}