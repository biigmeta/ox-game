import z from "zod";

import { encryptPassword } from "~/utils/password";
import { db } from "~/db/database";
import { UsersRepository } from "../user/user.repository";

export class UserService {
  constructor(
    private userRepository: UsersRepository = new UsersRepository()
  ) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    return db.$transaction(async (tx) => {
      const [data, total] = await Promise.all([
        this.userRepository.findMany(
          {
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          },
          tx
        ),
        this.userRepository.count({}, tx),
      ]);

      if (!data) throw new Error("No users found");

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    });
  }

  async findById(id: string) {
    return this.userRepository.findFirst({ where: { id: id } });
  }

  async softDelete(id: string) {
    return this.userRepository.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string) {
    return this.userRepository.delete({ where: { id } });
  }
}
