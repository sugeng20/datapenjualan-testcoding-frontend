"use client";

import ButtonSmallComponent from "@/components/ButtonSmallComponent";
import LinkComponent from "@/components/LinkComponent";
import LinkSmallComponent from "@/components/LinkSmallComponent";
import {
  deleteItem,
  fetchItems,
  setCurrentPage,
} from "@/lib/features/item/itemSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const ItemPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems(currentPage));
  }, [dispatch, currentPage]);

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
        dispatch(deleteItem(id))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: error.message,
            });
          });
      }
    });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Barang / </span>
          <span>Tabel Barang</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/item/create">Tambah Barang</LinkComponent>

        <div className="w-full border border-gray-200 rounded-xl overflow-x-auto mt-10">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-slate-800">
              <tr className="divide-x divide-gray-200">
                <th className="px-4 py-4">No</th>
                <th className="px-4 py-4">Nama Barang</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Jenis Barang</th>
                <th className="px-4 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      width={40}
                      className="animate-spin text-lg"
                    />
                  </td>
                </tr>
              ) : (
                data.map((item, index: number) => (
                  <tr className="divide-x divide-gray-200" key={index}>
                    <td className="px-4 py-4">
                      {index + 1 + (currentPage - 1) * 5}
                    </td>
                    <td className="px-4 py-4">{item.name}</td>
                    <td className="px-4 py-4">{item.stock}</td>
                    <td className="px-4 py-4">{item.type.type}</td>
                    <td className="px-4 py-4">
                      <LinkSmallComponent
                        color="blue"
                        icon={faEdit}
                        link={`/item/edit/${item.id}`}
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

export default ItemPage;
