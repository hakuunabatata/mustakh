import { PrismaClient } from '@prisma/client';

export const database = new PrismaClient();

export class Database {
  connect() {
    const database = new PrismaClient();

    return database;
  }
}
