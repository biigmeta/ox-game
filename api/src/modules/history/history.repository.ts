import { Prisma } from "@prisma/client";
import { DBClient, db } from "../../db/database";

export class HistoriesRepository {
  async create(args: Prisma.HistoriesCreateArgs, database: DBClient = db) {
    return database.histories.create(args);
  }

  async findMany(args: Prisma.HistoriesFindManyArgs, database: DBClient = db) {
    return database.histories.findMany(args);
  }

  async findFirst(args: Prisma.HistoriesFindFirstArgs, database: DBClient = db) {
    return database.histories.findFirst(args);
  }

  async findUnique(args: Prisma.HistoriesFindUniqueArgs, database: DBClient = db) {
    return database.histories.findUnique(args);
  }

  async update(args: Prisma.HistoriesUpdateArgs, database: DBClient = db) {
    return database.histories.update(args);
  }

  async delete(args: Prisma.HistoriesDeleteArgs, database: DBClient = db) {
    return database.histories.delete(args);
  }

  async count(args: Prisma.HistoriesCountArgs, database: DBClient = db) {
    return database.histories.count(args);
  }
}
