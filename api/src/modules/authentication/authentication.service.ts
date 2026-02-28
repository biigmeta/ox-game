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
import { AuthProviderType } from "~/types/auth";

export class AuthenticationService {
  constructor(
    private userRepository: UsersRepository = new UsersRepository(),
    private authenticationRepository: AuthenticationRepository = new AuthenticationRepository()
  ) {}

  async register(data: z.infer<typeof authRegisterSchema>) {
    return db.$transaction(async (tx) => {
      let userId = "";
      const existingUser = await this.userRepository.findByEmail(
        data.email,
        tx
      );

      if (!existingUser) {
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
        userId = user.id;
      } else {
        userId = existingUser.id;
      }

      const existingAuth = await this.authenticationRepository.findFirst(
        {
          where: { email: data.email, provider: "email" },
        },
        tx
      );

      if (existingAuth) {
        throw new Error("Email is already registered");
      }

      const hashedPassword = encryptPassword(data.password);

      const auth = await this.authenticationRepository.create(
        {
          data: {
            provider: "email",
            password: hashedPassword,
            email: data.email,
            subject: data.email,
            user: { connect: { id: userId } },
          },
          include: { user: true },
        },
        tx
      );

      const accessToken = getAccessToken({
        id: userId,
        email: auth.user.email,
        role: auth.user?.role,
      });

      const refreshToken = getRefreshToken({
        id: userId,
        email: auth.user.email,
        role: auth.user.role,
      });

      return {
        user: auth.user,
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
      throw new Error("No account found with the provided email");
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

  async continueWithSocial(
    provider: AuthProviderType,
    data: z.infer<typeof authSocialLoginSchema>
  ) {
    return db.$transaction(async (tx) => {
      let userId = "";
      const existingUser = await this.userRepository.findByEmail(
        data.email,
        tx
      );

      if (!existingUser) {
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
        userId = user.id;
      } else {
        userId = existingUser.id;
      }

      const existingAuth =
        await this.authenticationRepository.findFirstWithUser(
          {
            where: { email: data.email, provider: provider },
          },
          tx
        );

      if (existingAuth) {
        const accessToken = getAccessToken({
          id: userId,
          email: existingAuth.user.email,
          role: existingAuth.user?.role,
        });

        const refreshToken = getRefreshToken({
          id: userId,
          email: existingAuth.user.email,
          role: existingAuth.user.role,
        });

        return {
          user: existingAuth.user,
          accessToken,
          refreshToken,
        };
      }

      const creatingAuth = await this.authenticationRepository.create(
        {
          data: {
            provider: provider,
            email: data.email,
            subject: data.sub,
            user: { connect: { id: userId } },
          },
          include: { user: true },
        },
        tx
      );

      const accessToken = getAccessToken({
        id: userId,
        email: creatingAuth.user.email,
        role: creatingAuth.user?.role,
      });

      const refreshToken = getRefreshToken({
        id: userId,
        email: creatingAuth.user.email,
        role: creatingAuth.user.role,
      });

      return {
        user: creatingAuth.user,
        accessToken,
        refreshToken,
      };
    });
  }

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
