import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './infrastructure/database/mongodb/mongo.module.js';
import { DrizzleModule } from './infrastructure/postgres/drizzle.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
