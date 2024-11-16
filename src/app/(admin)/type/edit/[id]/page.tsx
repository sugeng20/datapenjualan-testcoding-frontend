"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputRowComponent from "@/components/InputRowComponent";
import LinkComponent from "@/components/LinkComponent";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchTypeById, updateType } from "@/lib/features/type/typeSlice";

const EditTypePage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { type, loading } = useSelector((state: RootState) => state.types);
  const [inputType, setInputType] = React.useState(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateType({ id: params.id, type: inputType }))
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Jenis barang berhasil diperbarui",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/type");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.message || "Ada kesalahan di server",
        });
      });
  };

  useEffect(() => {
    dispatch(fetchTypeById(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Jenis Barang / </span>
          <span>Edit Jenis Barang</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/type">Kembali</LinkComponent>

        <form onSubmit={handleSubmit} className="mt-10">
          <InputRowComponent
            label="Jenis Barang"
            type="text"
            id="type"
            placeholder="Masukkan Jenis Barang"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            required
          />
          <ButtonComponent loading={loading} label="Simpan" type="submit" />
        </form>
      </div>
    </>
  );
};

export default EditTypePage;
