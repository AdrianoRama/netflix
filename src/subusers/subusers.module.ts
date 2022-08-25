import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/guard/jwt.strategy';
import { User, UserSchema } from 'src/users/models/user.entity';
import { CreateSubuserCommandHandler } from './commands/handlers/create-subuser-command.handler';
import { DeleteAllSubusersCommandHandler } from './commands/handlers/delete-allSubusers-command.handler';
import { DeleteSubuserCommandHandler } from './commands/handlers/delete-subuser-command.handler';
import { UpdateSubuserCommandHandler } from './commands/handlers/update-subuser-command.handler';
import { FileController } from './controllers/file.controller';
import { SubusersController } from './controllers/subusers.controller';
import { Subuser, SubuserSchema } from './models/subuser.entity';
import { GetAllSubusersQueryHandler } from './queries/handlers/get-all-query.handler';
import { GetOneSubuserQueryHandler } from './queries/handlers/get-one-query.handler';
import { SubusersRepository } from './repositories/subusers.repository';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Subuser.name, schema: SubuserSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SubusersController, FileController],
  providers: [
    SubusersRepository,
    JwtStrategy,
    CreateSubuserCommandHandler,
    GetOneSubuserQueryHandler,
    GetAllSubusersQueryHandler,
    DeleteSubuserCommandHandler,
    DeleteAllSubusersCommandHandler,
    UpdateSubuserCommandHandler,
  ],
})
export class SubusersModule {}
