import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/user.entity';
import { SignUpCommandHandler } from './commands/handlers/signup-command.handler';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [SignUpCommandHandler, AuthRepository],
})
export class AuthModule {}
