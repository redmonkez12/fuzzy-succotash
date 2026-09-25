import { Global, Module } from '@nestjs/common';
import { MongoProvider } from '#app/infrastructure/database/mongodb/mongo.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoModule],
  providers: [MongoProvider],
  exports: [MongoProvider],
})
export class MongoModule {

}
