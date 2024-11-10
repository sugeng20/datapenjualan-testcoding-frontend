"use client";

import ButtonSmallComponent from "@/components/ButtonSmallComponent";
import LinkComponent from "@/components/LinkComponent";
import LinkSmallComponent from "@/components/LinkSmallComponent";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Item {
  id: string;
  type: string;
}

const TypePage: React.FC = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const deleteType = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${id}`,
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

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/type?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      if (json.status === "success") {
        setData(json.data.data);
        console.log(json.data.total);

        setTotalPages(Math.ceil(json.data.total / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
          <span className="text-blue-700 font-bold">Jenis Barang / </span>
          <span>Tabel Jenis Barang</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/type/create">Tambah Jenis Barang</LinkComponent>

        <div className="w-full border border-gray-200 rounded-xl overflow-x-auto mt-10">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-slate-800">
              <tr className="divide-x divide-gray-200">
                <th className="px-4 py-4">No</th>
                <th className="px-4 py-4">Jenis Barang</th>
                <th className="px-4 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
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
                    <td className="px-4 py-4">{item.type}</td>
                    <td className="px-4 py-4">
                      <LinkSmallComponent
                        color="blue"
                        icon={faEdit}
                        link={`/type/edit/${item.id}`}
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

export default TypePage;
