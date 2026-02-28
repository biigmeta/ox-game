"use client";

import { userService } from "@/services/user.service";
import { IUser } from "@/types/user";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [count, setCount] = useState(0); // user items count
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    const fetchUser = async () => {
      const response = await userService.getAll({
        page,
        limit,
        orderBy: orderBy,
        direction: direction,
        search: searchTerm,
      });

      setUsers(response.data);
      setCount(response.pagination.count);
      setTotalPages(response.pagination.totalPages);
    };
    if (searchTerm.length > 0 && searchTerm.length < 3) return;
    fetchUser();
  }, [page, limit, orderBy, direction, searchTerm]);

  return (
    <>
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
                <th className="border border-gray-300 px-4 py-2">Played</th>
                <th className="border border-gray-300 px-4 py-2">
                  Last Result
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Score
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Created At{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={clsx({
                    "bg-[var(--secondary-light)]": index % 2 === 0,
                  })}
                >
                  <td className="border border-gray-300 px-4 py-2 ">
                    {user?.firstName} {user?.lastName || ""}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {user?.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user?._count?.histories || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user?.histories.length > 0 ? (
                      <>
                        {user?.histories[0]?.result === "win" && (
                          <span className="text-green-500 font-bold">Win</span>
                        )}
                        {user?.histories[0]?.result === "lose" && (
                          <span className="text-red-500 font-bold">Lose</span>
                        )}
                        {user?.histories[0]?.result === "draw" && (
                          <span className="text-yellow-500 font-bold">
                            Draw
                          </span>
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user?.histories.length > 0 ? user?.histories[0]?.total : 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(user.createdAt).toLocaleString()}
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
    </>
  );
}
