import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_db',
      entities: [__dirname + '/**/*.schema{.ts,.js}'],
      synchronize: true, // Em produção, use migrations
    }),
    UsersModule,
  ],
})
export class AppModule {}
