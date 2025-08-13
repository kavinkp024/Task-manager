import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TasksModule } from './task/task.module';
import { TasksController } from './task/task.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      driver: require('mysql2'),
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'project',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    JwtModule
  ],
  controllers: [UsersController,TasksController],
  providers: [],
})
export class AppModule {}
