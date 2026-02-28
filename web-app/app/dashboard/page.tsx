"use client";
import InfoCard from "@/components/dahsboard/InfoCard";
import { historyService } from "@/services/history.service";
import { IHistory, IHistorySummary } from "@/types/history";
import clsx from "clsx";
import { useEffect, useState } from "react";
export default function Page() {
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [count, setCount] = useState(0); // history items count
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [summary, setSummary] = useState<IHistorySummary>({
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    highestTotal: 0,
    winRate: 0,
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      handleClearSearch();
    }
  };


  const handleClearSearch = () => {
    setSearchTerm("");
    setPage(1);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await historyService.getAll({
        page,
        limit,
        orderBy: orderBy,
        direction: direction,
        search: searchTerm,
      });

      setHistories(response.data);
      setCount(response.pagination.count);
      setTotalPages(response.pagination.totalPages);
    };
    if (searchTerm.length > 0 && searchTerm.length < 3) return;
    fetchHistory();
  }, [page, limit, orderBy, direction, searchTerm]);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await historyService.getSummary();
      setSummary(response);
    };
    fetchSummary();
  }, []);

  return (
    <div className="w-full h-full bg-[var(--card)] rounded-md shadow-md p-8 flex flex-col gap-4">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="grid grid-cols-6 gap-4">
        <InfoCard title="Total Games" value={summary.totalGames} />
        <InfoCard title="Highest Total" value={summary.highestTotal} />
        <InfoCard title="Win Rate" value={summary.winRate} suffix="%" />
        <InfoCard title="Total Wins" value={summary.totalWins} />
        <InfoCard title="Total Losses" value={summary.totalLosses} />
        <InfoCard title="Total Draws" value={summary.totalDraws} />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 grow">
        <div className="w-full flex flex-row items-end justify-between">
          <p>
            {count} {`Item(s)`}
          </p>
          <div className="flex flex-row items-center justify-between gap-4">
            <label htmlFor="search" className="block min-w-fit  font-medium">
              Search
            </label>
            <input
              id="search"
              type="search"
              placeholder="Name or Email"
              className="w-[300px] px-2 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
              value={searchTerm}
              onChange={handleChange}
            />
           
          </div>
        </div>
        <div className="w-full grow overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 ">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Player</th>
                <th className="border border-gray-300 px-4 py-2">Result</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((history, index) => (
                <tr
                  key={history.id}
                  className={clsx({
                    "bg-[var(--secondary-light)]": index % 2 === 0,
                  })}
                >
                  <td className="border border-gray-300 px-4 py-2 ">
                    {history?.user?.firstName} {history?.user?.lastName || ""}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {history?.user?.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {history.player === "O" && (
                      <span className="text-[var(--primary)] font-bold">O</span>
                    )}
                    {history.player === "X" && (
                      <span className="text-[var(--accent)] font-bold">X</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {history.result === "win" && (
                      <span className="text-green-500 font-bold">Win</span>
                    )}
                    {history.result === "lose" && (
                      <span className="text-red-500 font-bold">Lose</span>
                    )}
                    {history.result === "draw" && (
                      <span className="text-yellow-500 font-bold">Draw</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {history.score}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {history.total}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(history.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
