import { UserService } from "./user.service";
import { UsersRepository } from "./user.repository";
import { db } from "../../db/database";

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

describe("UserService", () => {
  let userService: UserService;
  let mockUsersRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    mockUsersRepository = {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    } as any;
    userService = new UserService(mockUsersRepository);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return paginated users", async () => {
      mockUsersRepository.findMany.mockResolvedValue([{ id: "u1" }] as any);
      mockUsersRepository.count.mockResolvedValue(1 as any);
      const result = await userService.findAll({ page: 1, limit: 10 });
      expect(mockUsersRepository.findMany).toHaveBeenCalled();
      expect(result.data).toHaveLength(1);
      expect(result.pagination.page).toBe(1);
    });
    it("should throw error if no users found", async () => {
      mockUsersRepository.findMany.mockResolvedValue(null as any);
      mockUsersRepository.count.mockResolvedValue(0 as any);
      await expect(userService.findAll({})).rejects.toThrow("No users found");
    });
  });

  describe("findById", () => {
    it("should return user by id", async () => {
      mockUsersRepository.findFirst.mockResolvedValue({ id: "u1" } as any);
      const result = await userService.findById("u1");
      expect(mockUsersRepository.findFirst).toHaveBeenCalledWith({ where: { id: "u1" } });
      expect(result).toEqual({ id: "u1" });
    });
  });

  describe("me", () => {
    it("should return user profile by userId", async () => {
      mockUsersRepository.findFirst.mockResolvedValue({ id: "u1", authentications: [], histories: [] } as any);
      const result = await userService.me("u1");
      expect(mockUsersRepository.findFirst).toHaveBeenCalledWith({
        where: { id: "u1" },
        include: expect.any(Object),
      });
      expect(result).toEqual(expect.objectContaining({ id: "u1" }));
    });
  });

  describe("softDelete", () => {
    it("should soft delete user", async () => {
      const mockUser = { id: "u1", deletedAt: new Date() };
      mockUsersRepository.update.mockResolvedValue(mockUser as any);
      const result = await userService.softDelete("u1");
      expect(mockUsersRepository.update).toHaveBeenCalledWith({
        where: { id: "u1" },
        data: { deletedAt: expect.any(Date) },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("hardDelete", () => {
    it("should hard delete user", async () => {
      const mockUser = { id: "u1" };
      mockUsersRepository.delete.mockResolvedValue(mockUser as any);
      const result = await userService.hardDelete("u1");
      expect(mockUsersRepository.delete).toHaveBeenCalledWith({ where: { id: "u1" } });
      expect(result).toEqual(mockUser);
    });
  });
});
