import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import {PrismaModule} from "nestjs-prisma";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }), // Prisma вместо TypeORM
    AuthModule,
    ] ,
  controllers: [AppController],
})
export class AppModule {}