import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/guard/jwt.strategy';
import { User, UserSchema } from 'src/users/models/user.entity';
import { CreateSubuserCommandHandler } from './commands/handlers/create-subuser-command.handler';
import { SubusersController } from './controllers/subusers.controller';
import { Subuser, SubuserSchema } from './models/subuser.entity';
import { SubusersRepository } from './repositories/subusers.repository';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Subuser.name, schema: SubuserSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SubusersController],
  providers: [SubusersRepository, JwtStrategy, CreateSubuserCommandHandler],
})
export class SubusersModule {}
