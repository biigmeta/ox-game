import z from "zod";
import { db } from "~/db/database";
import { comparePassword, encryptPassword } from "~/utils/password";
import { UsersRepository } from "~/modules/user/user.repository";
import { AuthenticationRepository } from "~/modules/authentication/authentication.repository";
import {
  authLoginSchema,
  authRegisterSchema,
  authSocialLoginSchema,
} from "./authentication.schema";
import { getAccessToken, getRefreshToken } from "~/utils/jwt";

export class AuthenticationService {
  constructor(
    private userRepository: UsersRepository = new UsersRepository(),
    private authenticationRepository: AuthenticationRepository = new AuthenticationRepository()
  ) {}

  async register(data: z.infer<typeof authRegisterSchema>) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    return db.$transaction(async (tx) => {
      const user = await this.userRepository.create(
        {
          data: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
        tx
      );

      if (!user) {
        throw new Error("User not found after creation");
      }

      const hashedPassword = encryptPassword(data.password);

      await this.authenticationRepository.create(
        {
          data: {
            provider: "email",
            password: hashedPassword,
            email: data.email,
            subject: data.email,
            user: { connect: { id: user.id } },
          },
        },
        tx
      );

      const accessToken = getAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = getRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    });
  }

  async login(data: z.infer<typeof authLoginSchema>) {
    const authentication =
      await this.authenticationRepository.findFirstWithUser({
        where: { email: data.email, provider: "email" },
        include: { user: true },
      });

    if (!authentication) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = comparePassword(
      data.password,
      authentication.password!
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = getAccessToken({
      id: authentication.userId,
      email: authentication.email,
      role: authentication.user?.role,
    });

    const refreshToken = getRefreshToken({
      id: authentication.userId,
      email: authentication.email,
      role: authentication.user?.role,
    });

    return {
      user: authentication.user,
      accessToken,
      refreshToken,
    };
  }

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
