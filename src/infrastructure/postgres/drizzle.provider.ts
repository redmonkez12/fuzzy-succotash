import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { defineRelations, sql } from 'drizzle-orm';
import * as schema from '#app/infrastructure/postgres/schema/index';

const relations = defineRelations(schema);

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDB = PostgresJsDatabase<typeof relations>;

export const DrizzleProvider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<DrizzleDB> => {
    const connectionString = configService.getOrThrow<string>('POSTGRES_DATABASE_URL');

    const client = postgres(connectionString);
    const db = drizzle({ client, relations });
    await db.execute(sql`SELECT 1`);
    return db;
  },
};
