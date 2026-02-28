import { Prisma } from "@prisma/client";
import { DBClient, db } from "../../db/database";

export class UsersRepository {
  async create(args: Prisma.UsersCreateArgs, database: DBClient = db) {
    return database.users.create(args);
  }

  async findMany(args: Prisma.UsersFindManyArgs, database: DBClient = db) {
    return database.users.findMany(args);
  }

  async findFirst(args: Prisma.UsersFindFirstArgs, database: DBClient = db) {
    return database.users.findFirst(args);
  }

  async findUnique(args: Prisma.UsersFindUniqueArgs, database: DBClient = db) {
    return database.users.findUnique(args);
  }

  async findByEmail(email: string, database: DBClient = db) {
    return database.users.findFirst({
      where: { email },
    });
  }

  async update(args: Prisma.UsersUpdateArgs, database: DBClient = db) {
    return database.users.update(args);
  }

  async delete(args: Prisma.UsersDeleteArgs, database: DBClient = db) {
    return database.users.delete(args);
  }

  async count(args: Prisma.UsersCountArgs, database: DBClient = db) {
    return database.users.count(args);
  }
}
