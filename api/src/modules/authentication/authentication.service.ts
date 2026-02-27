import { PrismaClient } from "@prisma/client";
import z from "zod";
import {
  authLoginSchema,
  authRegisterSchema,
  authSocialLoginSchema,
} from "./authentication.schema";
import { encryptPassword } from "~/src/utils/password";
import { AuthenticationRepository } from "./authentication.repository";
import { db } from "~/src/db/database";
import { UsersRepository } from "../user/user.repository";

export class AuthenticationService {
  constructor(
    private userRepository: UsersRepository = new UsersRepository(),
    private authenticationRepository: AuthenticationRepository = new AuthenticationRepository()
  ) {}

  async register(data: z.infer<typeof authRegisterSchema>) {
    if (!data.acceptTermsAndConditions || !data.acceptPrivacyPolicy) {
      throw new Error(
        "You must accept the terms and conditions and privacy policy to register."
      );
    }

    return db.$transaction(async (tx) => {
      let userId = "" as string;
      const user = await this.userRepository.findFirst(
        {
          where: { email: data.email },
        },
        tx
      );

      userId = user?.id || "";

      if (!user) {
        const createUser = await this.userRepository.create(
          {
            data: {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
          tx
        );
        userId = createUser.id;
      }

      const hashedPassword = encryptPassword(data.password);

      await this.authenticationRepository.create({
        data: {
          provider: "email",
          userId: userId,
          password: hashedPassword,
          email: data.email,
          subject: data.email,
        },
      });
    });
  }

  async login(data: z.infer<typeof authLoginSchema>) {}

  async continueWithSocial(data: z.infer<typeof authSocialLoginSchema>) {}

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    return db.$transaction(async (tx) => {
      const [data, total] = await Promise.all([
        this.authenticationRepository.findMany(
          {
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          },
          tx
        ),
        this.authenticationRepository.count({}, tx),
      ]);

      if (!data) throw new Error("No authentications found");

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

  async findByUserId(userId: string) {
    return this.authenticationRepository.findFirst({ where: { userId } });
  }

  async softDelete(id: string) {
    return this.authenticationRepository.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string) {
    return this.authenticationRepository.delete({ where: { id } });
  }
}
