import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { Subuser, SubuserSchema } from 'src/subusers/models/subuser.entity';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { DeleteUserCommandHandler } from './commands/handlers/delete-user-command.handler';
import { UpdateCommandHandler } from './commands/handlers/update-command.handler';
import { UsersController } from './controllers/users.controller';
import { DeleteSubusersEventHandler } from './events/handler/delete-subusers-event.handler';
import { RatedMoviesEventHandler } from './events/handler/rated-movies.event';
import { User, UserSchema } from './models/user.entity';
import { GetUserQueryHandler } from './queries/handlers/get-user-query.handler';
import { GetUsersQueryHandler } from './queries/handlers/get-users-query.handler';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Subuser.name, schema: SubuserSchema }]),

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
    DeleteUserCommandHandler,
    DeleteSubusersEventHandler,
    SubusersRepository,
  ],
})
export class UsersModule {}
