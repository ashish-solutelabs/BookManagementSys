import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.register({
          secret:'solute85',
          signOptions:{
            expiresIn:3600,
          }
        }),
  ],
  providers: [UserService,JwtStrategy],
  controllers: [UserController],
  exports :[
    JwtStrategy,
    PassportModule
  ],
}) 
export class UserModule {}
