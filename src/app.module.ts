import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {}
