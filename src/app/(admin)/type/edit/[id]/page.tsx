"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputRowComponent from "@/components/InputRowComponent";
import LinkComponent from "@/components/LinkComponent";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const EditTypePage = ({ params }: { params: { id: string } }) => {
  const [type, setType] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      type: type,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
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
          title: "Gagal",
          text: json.message,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Ada Kesalahan di server",
      });
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${params.id}`,
          {
            method: "GET",
          }
        );

        const json = await response.json();
        if (json.status === "success") {
          setType(json.data.type);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

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
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <ButtonComponent loading={loading} label="Simpan" type="submit" />
        </form>
      </div>
    </>
  );
};

export default EditTypePage;
