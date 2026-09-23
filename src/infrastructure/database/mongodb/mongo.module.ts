import { Global, Module } from '@nestjs/common';
import { MongoProvider } from './mongo.provider.js';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoModule],
  providers: [MongoProvider],
  exports: [MongoProvider],
})
export class MongoModule {

}
