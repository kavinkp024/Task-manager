import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,
          expandVariables:true,
        }),
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    JwtModule.register({
      secret: process.env.YOUR_SECRET_KEY,
      signOptions: { expiresIn: '1hr' },
}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard]
})

export class AuthModule { }

