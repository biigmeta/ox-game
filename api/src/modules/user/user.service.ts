import { db } from "../../db/database";
import { UsersRepository } from "../user/user.repository";

export class UserService {
  constructor(
    private userRepository: UsersRepository = new UsersRepository()
  ) {}

  async findAll({
    page = 1,
    limit = 10,
    orderBy = { createdAt: "desc" },
    searchTerm,
  }: {
    page?: number;
    limit?: number;
    orderBy?: Record<string, "asc" | "desc">;
    searchTerm?: string;
  }) {
    const skip = (page - 1) * limit;

    return db.$transaction(async (tx) => {
      const [data, count, total] = await Promise.all([
        this.userRepository.findMany(
          {
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              _count: {
                select: { histories: true },
              },
              histories: {
                select: {
                  id: true,
                  bonus: true,
                  player: true,
                  result: true,
                  score: true,
                  total: true,
                },
                take: 1,
                orderBy: { createdAt: "desc" },
              },
              authentications: {
                select: {
                  provider: true,
                },
              },
            },
            where: searchTerm
              ? {
                  OR: [
                    {
                      firstName: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                    {
                      lastName: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                    {
                      email: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : undefined,
          },
          tx
        ),
        this.userRepository.count(
          {
            where: searchTerm
              ? {
                  OR: [
                    {
                      firstName: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                    {
                      lastName: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                    {
                      email: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : undefined,
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
          count,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    });
  }

  async findById(id: string) {
    return this.userRepository.findFirst({ where: { id: id } });
  }

  async me(userId: string) {
    return this.userRepository.findFirst({
      where: { id: userId },
      include: {
        authentications: {
          select: {
            provider: true,
            email: true,
            subject: true,
          },
        },
        histories: {
          select: {
            id: true,
            result: true,
            score: true,
            bonus: true,
            total: true,
            streak: true,
            description: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
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
