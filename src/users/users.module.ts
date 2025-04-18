import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CustomLoggerService],
})
export class UsersModule {}
