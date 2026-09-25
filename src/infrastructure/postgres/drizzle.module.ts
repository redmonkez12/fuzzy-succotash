import { Global, Module } from '@nestjs/common';
import { DrizzleProvider } from '#app/infrastructure/postgres/drizzle.provider';

@Global()
@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleProvider],
})
export class DrizzleModule {}
