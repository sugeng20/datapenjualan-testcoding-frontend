"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputRowComponent from "@/components/InputRowComponent";
import LinkComponent from "@/components/LinkComponent";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CreateItemPage: React.FC = (): JSX.Element => {
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [typeId, setTypeId] = React.useState("");
  const [dataType, setDataType] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("type_id", typeId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/item`,
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
        Router.push("/item");
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
          `${process.env.NEXT_PUBLIC_API_BACKEND}/type`,
          {
            method: "GET",
          }
        );

        const json = await response.json();
        if (json.status === "success") {
          setDataType(json.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-6 px-8 bg-white border shadow mt-4 rounded-2xl">
        <p className="text-lg">
          <span className="text-blue-700 font-bold">Jenis Barang / </span>
          <span>Tambah Jenis Barang</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/item">Kembali</LinkComponent>

        <form onSubmit={handleSubmit} className="mt-10">
          <InputRowComponent
            label="Nama Barang"
            type="text"
            id="type"
            placeholder="Masukkan Nama Barang"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputRowComponent
            label="Stock"
            type="number"
            id="stock"
            placeholder="Masukkan Stock"
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <div className="mb-3 grid grid-cols-1 md:grid-cols-12  items-center">
            <label className="text-sm md:col-span-2" htmlFor="jenis_barang">
              Jenis Barang <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 md:col-span-10">
              <select
                id="type_id"
                className="py-4 px-2 text-sm w-full border border-gray-300 rounded-xl"
                onChange={(e) => setTypeId(e.target.value)}
                required
              >
                <option value="">Pilih</option>
                {dataType.map((item: Item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ButtonComponent loading={loading} label="Simpan" type="submit" />
        </form>
      </div>
    </>
  );
};

interface Item {
  id: string;
  type: string;
}

export default CreateItemPage;
