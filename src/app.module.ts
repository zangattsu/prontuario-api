import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule,UsersModule],
})
export class AppModule {}
