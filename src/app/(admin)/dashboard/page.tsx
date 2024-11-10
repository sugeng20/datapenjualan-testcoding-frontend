"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DashboardPage: React.FC = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDateRange, setStartDateRange] = useState("");

  const [startDate, endDate] = dateRange;

  const [sort, setSort] = useState("");
  const itemsPerPage = 5;

  const fetchData = useCallback(
    async (
      page: number = 1,
      dateRangeTerm = dateRange,
      sortTerm: string = sort
    ) => {
      setLoading(true);
      let daterange = "";
      if (dateRangeTerm[0] && dateRangeTerm[1]) {
        // Format tanggal menjadi string yang dapat dibaca oleh API
        const startDate = dateRangeTerm[0].toISOString().split("T")[0]; // YYYY-MM-DD
        const endDate = dateRangeTerm[1].toISOString().split("T")[0]; // YYYY-MM-DD
        daterange = `${startDate} - ${endDate}`;
      }
      try {
        const queryParams = new URLSearchParams({
          sort: sortTerm,
          page: String(page),
          limit: String(itemsPerPage),
          daterange: daterange,
        });
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BACKEND
          }/dashboard?${queryParams.toString()}`
        );
        const json = await response.json();
        if (json.status === "success") {
          setData(json.data);
          setTotalPages(Math.ceil(json.data.total / itemsPerPage));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, dateRange, sort]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Dashboard / </span>
          <span>Tabel Dashboard</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <h1 className="text-2xl">Transaksi Berdasarkan Jenis Barang</h1>

        <div className="flex">
          <div className="">
            <DatePicker
              selectsRange={true}
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              onChange={(update) => {
                setDateRange(update ?? [null, null]);
              }}
              isClearable={true}
              className="mt-4 border border-gray-300 rounded-xl py-4 px-8 text-sm"
              placeholderText="Pilih Tanggal"
            />
          </div>
        </div>

        <div className="w-full border border-gray-200 rounded-xl overflow-x-auto mt-10">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-slate-800">
              <tr className="divide-x divide-gray-200">
                <th className="px-4 py-4">No</th>
                <th className="px-4 py-4">Jenis Barang</th>
                <th className="px-4 py-4">
                  Jumlah Terjual{" "}
                  <select
                    onChange={(e) => setSort(e.target.value)}
                    className="divide-y ml-3 divide-gray-200"
                  >
                    <option value="">Urutkan</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>{" "}
                </th>
                <th className="px-4 py-4">Jenis Transaksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      width={40}
                      className="animate-spin text-lg"
                    />
                  </td>
                </tr>
              ) : (
                data.map((item: any, index: number) => (
                  <tr className="divide-x divide-gray-200" key={index}>
                    <td className="px-4 py-4">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-4 py-4">{item.type}</td>
                    <td className="px-4 py-4">{item.quantity_sold}</td>
                    <td className="px-4 py-4">{item.items_count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
