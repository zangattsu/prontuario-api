import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
