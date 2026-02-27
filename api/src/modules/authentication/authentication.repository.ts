import { Prisma } from "@prisma/client";
import { DBClient, db } from "~/src/db/database";

export class AuthenticationRepository {
  async create(
    args: Prisma.AuthenticationsCreateArgs,
    database: DBClient = db
  ) {
    return database.authentications.create(args);
  }

  async findMany(
    args: Prisma.AuthenticationsFindManyArgs,
    database: DBClient = db
  ) {
    return database.authentications.findMany(args);
  }

  async findFirst(
    args: Prisma.AuthenticationsFindFirstArgs,
    database: DBClient = db
  ) {
    return database.authentications.findFirst(args);
  }

  async findUnique(
    args: Prisma.AuthenticationsFindUniqueArgs,
    database: DBClient = db
  ) {
    return database.authentications.findUnique(args);
  }

  async update(args: Prisma.AuthenticationsUpdateArgs, database: DBClient = db) {
    return database.authentications.update(args);
  }

  async delete(args: Prisma.AuthenticationsDeleteArgs, database: DBClient = db) {
    return database.authentications.delete(args);
  }

  async count(args: Prisma.AuthenticationsCountArgs, database: DBClient = db) {
    return database.authentications.count(args);
  }
}
