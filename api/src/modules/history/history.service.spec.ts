import { HistorieService } from "./history.service";
import { HistoriesRepository } from "./history.repository";
import { db } from "../../db/database";
import { createHistoriesSchema } from "./history.schema";

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

describe("HistorieService", () => {
  let historyService: HistorieService;
  let mockHistoriesRepository: jest.Mocked<HistoriesRepository>;

  beforeEach(() => {
    mockHistoriesRepository = {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    } as any;
    historyService = new HistorieService(mockHistoriesRepository);
    jest.clearAllMocks();
  });

  describe("create", () => {
    const baseData = {
      userId: "user1",
      player: "X" as const,
      result: "win" as const,
      description: "desc",
    };
    it("should create a new history with win", async () => {
      mockHistoriesRepository.findFirst.mockResolvedValue(null);
      mockHistoriesRepository.create.mockResolvedValue({ id: "h1", ...baseData } as any);
      const result = await historyService.create(baseData);
      expect(mockHistoriesRepository.create).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: "h1" }));
    });
    it("should create a new history with lose", async () => {
      mockHistoriesRepository.findFirst.mockResolvedValue(null);
      mockHistoriesRepository.create.mockResolvedValue({ id: "h2", ...baseData, result: "lose" } as any);
      const result = await historyService.create({ ...baseData, result: "lose" });
      expect(mockHistoriesRepository.create).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: "h2" }));
    });
  });

  describe("findAll", () => {
    it("should return paginated histories", async () => {
      mockHistoriesRepository.findMany.mockResolvedValue([{ id: "h1" }] as any);
      mockHistoriesRepository.count.mockResolvedValue(1 as any);
      const result = await historyService.findAll({ page: 1, limit: 10 });
      expect(mockHistoriesRepository.findMany).toHaveBeenCalled();
      expect(result.data).toHaveLength(1);
      expect(result.pagination.page).toBe(1);
    });
    it("should throw error if no histories found", async () => {
      mockHistoriesRepository.findMany.mockResolvedValue(null as any);
      mockHistoriesRepository.count.mockResolvedValue(0 as any);
      await expect(historyService.findAll({})).rejects.toThrow("No histories found");
    });
  });

  describe("findById", () => {
    it("should return history by id", async () => {
      mockHistoriesRepository.findFirst.mockResolvedValue({ id: "h1" } as any);
      const result = await historyService.findById("h1");
      expect(mockHistoriesRepository.findFirst).toHaveBeenCalledWith({ where: { id: "h1" } });
      expect(result).toEqual({ id: "h1" });
    });
  });

  describe("findByUserId", () => {
    it("should return histories by userId", async () => {
      mockHistoriesRepository.findMany.mockResolvedValue([{ id: "h1", userId: "user1" }] as any);
      const result = await historyService.findByUserId("user1");
      expect(mockHistoriesRepository.findMany).toHaveBeenCalledWith({ where: { userId: "user1" } });
      expect(result).toEqual([{ id: "h1", userId: "user1" }]);
    });
  });

  describe("summary", () => {
    it("should return summary data", async () => {
      mockHistoriesRepository.count.mockResolvedValue(5 as any);
      mockHistoriesRepository.findFirst.mockResolvedValue({ total: 10 } as any);
      const result = await historyService.summary();
      expect(mockHistoriesRepository.count).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });
});
