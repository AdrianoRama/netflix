import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UpdateCommandHandler } from './commands/handlers/update-command.handler';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './models/user.entity';
import { GetUserQueryHandler } from './queries/handlers/get-user-query.handler';
import { GetUsersQueryHandler } from './queries/handlers/get-users-query.handler';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    GetUserQueryHandler,
    GetUsersQueryHandler,
    AuthRepository,
    UpdateCommandHandler,
    JwtService,
  ],
})
export class UsersModule {}
