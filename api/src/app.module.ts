import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import {DatabaseConfig} from './database.config';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

const Config = ConfigModule.forRoot({
  isGlobal: true,
  load: [config]
})

const ServeStatic = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'uploads')
})

const TypeORMConnection = TypeOrmModule.forRootAsync({
  useClass: DatabaseConfig,
  imports: [ConfigModule]
})

@Module({
  imports: [UserModule, TypeORMConnection, ServeStatic, Config],
  controllers: [],
  providers: [],
})
export class AppModule {}
