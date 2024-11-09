"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputRowComponent from "@/components/InputRowComponent";
import LinkComponent from "@/components/LinkComponent";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CreateType: React.FC = (): JSX.Element => {
  const [type, setType] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/type`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await response.json();
      if (json.status === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: json.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        Router.push("/type");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: json.message,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: "Ada Kesalahan di server",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Jenis Barang / </span>
          <span>Tambah Jenis Barang</span>
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
            onChange={(e) => setType(e.target.value)}
            required
          />
          <ButtonComponent loading={loading} label="Simpan" type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateType;
