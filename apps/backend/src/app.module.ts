import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisProvider } from './providers/redis.provider';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NodesModule } from './nodes/nodes.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UsersModule,
    AuthModule,
    NodesModule,
  ],
  controllers: [],
  providers: [RedisProvider, JwtStrategy],
  exports: [RedisProvider],
})
export class AppModule {}
