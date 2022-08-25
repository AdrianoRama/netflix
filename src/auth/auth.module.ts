import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Subuser, SubuserSchema } from 'src/subusers/models/subuser.entity';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { User, UserSchema } from 'src/users/models/user.entity';
import { SignInCommandHandler } from './commands/handlers/signIn-command.handler';
import { SignUpCommandHandler } from './commands/handlers/signup-command.handler';
import { AuthController } from './controllers/auth.controller';
import { CreateSubUserEventHandler } from './events/handler/create-subuser-event.handler';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Subuser.name, schema: SubuserSchema }]),
    CqrsModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    SignUpCommandHandler,
    AuthRepository,
    JwtService,
    SignInCommandHandler,
    CreateSubUserEventHandler,
    SubusersRepository,
  ],
})
export class AuthModule {}
