import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthUserSerializerService } from './serializers/auth.user.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthUserSerializerService, UsersService],
  exports: [AuthUserSerializerService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
