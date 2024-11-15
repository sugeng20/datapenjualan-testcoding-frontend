"use client";

import ButtonSmallComponent from "@/components/ButtonSmallComponent";
import LinkComponent from "@/components/LinkComponent";
import LinkSmallComponent from "@/components/LinkSmallComponent";
import { formatDate } from "@/utils/formatDate";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

interface Item {
  name: string;
  old_stock: number;
  quantity_sold: number;
  date: string;
  type: string;
  id: string;
}

const TransactionPage: React.FC = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortItem, setSortItem] = useState("");
  const [sortDate, setSortDate] = useState("");
  const itemsPerPage = 10;

  const fetchData = useCallback(
    async (
      page: number = 1,
      searchTerm: string = search,
      sortItemTerm: string = sortItem,
      sortDateTerm: string = sortDate
    ) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND}/transaction?page=${page}&limit=${itemsPerPage}&search=${searchTerm}&sort_item_name=${sortItemTerm}&sort_date=${sortDateTerm}`
        );
        const json = await response.json();
        if (json.status === "success") {
          setData(json.data.data);
          setTotalPages(Math.ceil(json.data.total / itemsPerPage));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, sortItem, sortDate, search]
  );

  const deleteType = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/transaction/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      fetchData(currentPage);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: json.message,
      });
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteType(id);
      }
    });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, search);
  };

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Transaksi / </span>
          <span>Tabel Transaksi</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/transaction/create">
          Tambah Transaksi
        </LinkComponent>

        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-4">
            <input
              type="text"
              placeholder="Cari disini"
              className="py-4 px-2 text-sm w-full border border-gray-300 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-xl"
            onClick={handleSearch}
          >
            Cari
          </button>
        </div>

        <div className="w-full border border-gray-200 rounded-xl overflow-x-auto mt-5">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-slate-800">
              <tr className="divide-x divide-gray-200">
                <th className="px-4 py-4">No</th>
                <th className="px-4 py-4">
                  Nama Barang{" "}
                  <select
                    onChange={(e) => setSortItem(e.target.value)}
                    className="divide-y ml-3 divide-gray-200"
                  >
                    <option value="">Urutkan</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>{" "}
                </th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Jumlah Terjual</th>
                <th className="px-4 py-4">
                  Tanggal Transaksi{" "}
                  <select
                    onChange={(e) => setSortDate(e.target.value)}
                    className="divide-y ml-3 divide-gray-200"
                  >
                    <option value="">Urutkan</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>{" "}
                </th>
                <th className="px-4 py-4">Jenis Barang</th>
                <th className="px-4 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      width={40}
                      className="animate-spin text-lg"
                    />
                  </td>
                </tr>
              ) : (
                data.map((item: Item, index: number) => (
                  <tr className="divide-x divide-gray-200" key={index}>
                    <td className="px-4 py-4">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-4 py-4">{item.name}</td>
                    <td className="px-4 py-4">{item.old_stock}</td>
                    <td className="px-4 py-4">{item.quantity_sold}</td>
                    <td className="px-4 py-4">{formatDate(item.date)}</td>
                    <td className="px-4 py-4">{item.type}</td>
                    <td className="px-4 py-4">
                      <LinkSmallComponent
                        color="blue"
                        icon={faEdit}
                        link={`/transaction/edit/${item.id}`}
                      >
                        Edit
                      </LinkSmallComponent>
                      <ButtonSmallComponent
                        icon={faTrash}
                        onClick={() => handleDelete(item.id)}
                        type="button"
                        color="red"
                      >
                        Hapus
                      </ButtonSmallComponent>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
