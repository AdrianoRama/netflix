import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/models/user.entity';
import { SignInCommandHandler } from './commands/handlers/signIn-command.handler';
import { SignUpCommandHandler } from './commands/handlers/signup-command.handler';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    SignUpCommandHandler,
    AuthRepository,
    JwtService,
    SignInCommandHandler,
  ],
})
export class AuthModule {}
