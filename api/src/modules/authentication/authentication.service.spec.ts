import { AuthenticationService } from "./authentication.service";
import { AuthenticationRepository } from "./authentication.repository";
import { UsersRepository } from "../user/user.repository";
import { db } from "../../db/database";
import { encryptPassword, comparePassword } from "../../utils/password";
import { getAccessToken, getRefreshToken } from "../../utils/jwt";
import { AppError } from "../../middlewares/error_handler.middleware";

// Mock dependencies
const mockDb: any = {
  $transaction: jest.fn((callback) => callback(mockDb)),
};

jest.mock("../../db/database", () => ({
  db: {
    get $transaction() {
      return mockDb.$transaction;
    },
  },
}));

jest.mock("../../utils/password", () => ({
  encryptPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

jest.mock("../../utils/jwt", () => ({
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
}));

describe("AuthenticationService", () => {
  let authenticationService: AuthenticationService;
  let mockAuthenticationRepository: jest.Mocked<AuthenticationRepository>;
  let mockUsersRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    mockAuthenticationRepository = {
      findFirst: jest.fn(),
      findFirstWithUser: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    mockUsersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    authenticationService = new AuthenticationService(
      mockUsersRepository,
      mockAuthenticationRepository
    );

    jest.clearAllMocks();
  });

  describe("register", () => {
    const registerData = {
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    it("should register a new user successfully", async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue({
        id: "user-id",
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      mockAuthenticationRepository.findFirst.mockResolvedValue(null);
      (encryptPassword as jest.Mock).mockReturnValue("hashedPassword");

      mockAuthenticationRepository.create.mockResolvedValue({
        id: "auth-id",
        userId: "user-id",
        email: registerData.email,
        user: {
          id: "user-id",
          email: registerData.email,
          role: "USER",
        },
      } as any);

      (getAccessToken as jest.Mock).mockReturnValue("access-token");
      (getRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      const result = await authenticationService.register(registerData);

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        registerData.email,
        expect.anything()
      );
      expect(mockUsersRepository.create).toHaveBeenCalled();
      expect(mockAuthenticationRepository.findFirst).toHaveBeenCalled();
      expect(encryptPassword).toHaveBeenCalledWith(registerData.password);
      expect(mockAuthenticationRepository.create).toHaveBeenCalled();
      expect(result).toEqual({
        user: expect.objectContaining({ id: "user-id" }),
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    });

    it("should throw error if email is already registered", async () => {
      mockUsersRepository.findByEmail.mockResolvedValue({
        id: "user-id",
      } as any);

      mockAuthenticationRepository.findFirst.mockResolvedValue({
        id: "auth-id",
      } as any);

      await expect(authenticationService.register(registerData)).rejects.toThrow(
        new AppError("Email is already registered", 400)
      );
    });
  });

  describe("login", () => {
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    it("should login successfully", async () => {
      mockAuthenticationRepository.findFirstWithUser.mockResolvedValue({
        id: "auth-id",
        userId: "user-id",
        password: "hashedPassword",
        email: loginData.email,
        user: {
          id: "user-id",
          email: loginData.email,
          role: "USER",
        },
      } as any);

      (comparePassword as jest.Mock).mockReturnValue(true);
      (getAccessToken as jest.Mock).mockReturnValue("access-token");
      (getRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      const result = await authenticationService.login(loginData);

      expect(mockAuthenticationRepository.findFirstWithUser).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { email: loginData.email, provider: "email" },
        })
      );
      expect(comparePassword).toHaveBeenCalledWith(
        loginData.password,
        "hashedPassword"
      );
      expect(result).toEqual({
        user: expect.objectContaining({ id: "user-id" }),
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    });

    it("should throw error if account not found", async () => {
      mockAuthenticationRepository.findFirstWithUser.mockResolvedValue(null);

      await expect(authenticationService.login(loginData)).rejects.toThrow(
        new AppError("No account found with the provided email", 404)
      );
    });

    it("should throw error if password is invalid", async () => {
      mockAuthenticationRepository.findFirstWithUser.mockResolvedValue({
        id: "auth-id",
        password: "hashedPassword",
      } as any);

      (comparePassword as jest.Mock).mockReturnValue(false);

      await expect(authenticationService.login(loginData)).rejects.toThrow(
        new AppError("Invalid email or password", 400)
      );
    });
  });

  describe("findAll", () => {
    it("should return paginated results", async () => {
      const mockResult = [{ id: "auth1" }, { id: "auth2" }];
      const mockTotal = 2;

      mockAuthenticationRepository.findMany.mockResolvedValue(mockResult as any);
      mockAuthenticationRepository.count.mockResolvedValue(mockTotal);

      const result = await authenticationService.findAll({ page: 1, limit: 10 });

      expect(mockAuthenticationRepository.findMany).toHaveBeenCalledWith(
        {
          skip: 0,
          take: 10,
          orderBy: { createdAt: "desc" },
        },
        expect.anything()
      );
      expect(mockAuthenticationRepository.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: mockResult,
        pagination: {
          page: 1,
          limit: 10,
          total: mockTotal,
          totalPages: 1,
        },
      });
    });

    it("should throw error if no authentications found", async () => {
      mockAuthenticationRepository.findMany.mockResolvedValue(null as any);
      mockAuthenticationRepository.count.mockResolvedValue(0);

      await expect(authenticationService.findAll({})).rejects.toThrow(
        new AppError("No authentications found", 404)
      );
    });
  });

  describe("findByUserId", () => {
    it("should return authentication by userId", async () => {
      const mockAuth = { id: "auth1", userId: "user1" };
      mockAuthenticationRepository.findFirst.mockResolvedValue(mockAuth as any);

      const result = await authenticationService.findByUserId("user1");

      expect(mockAuthenticationRepository.findFirst).toHaveBeenCalledWith({
        where: { userId: "user1" },
      });
      expect(result).toEqual(mockAuth);
    });
  });

  describe("softDelete", () => {
    it("should soft delete authentication", async () => {
      const mockAuth = { id: "auth1", deletedAt: new Date() };
      mockAuthenticationRepository.update.mockResolvedValue(mockAuth as any);

      const result = await authenticationService.softDelete("auth1");

      expect(mockAuthenticationRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "auth1" },
          data: { deletedAt: expect.any(Date) },
        })
      );
      expect(result).toEqual(mockAuth);
    });
  });

  describe("hardDelete", () => {
    it("should hard delete authentication", async () => {
      const mockAuth = { id: "auth1" };
      mockAuthenticationRepository.delete.mockResolvedValue(mockAuth as any);

      const result = await authenticationService.hardDelete("auth1");

      expect(mockAuthenticationRepository.delete).toHaveBeenCalledWith({
        where: { id: "auth1" },
      });
      expect(result).toEqual(mockAuth);
    });
  });
});
