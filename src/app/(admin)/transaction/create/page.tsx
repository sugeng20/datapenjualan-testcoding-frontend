"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputRowComponent from "@/components/InputRowComponent";
import LinkComponent from "@/components/LinkComponent";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Item {
  id: string;
  name: string;
}

const CreateTransactionPage: React.FC = (): JSX.Element => {
  const [itemId, setItemId] = React.useState("");
  const [quantitySold, setQuantitySold] = React.useState("");
  const [date, setDate] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [dataItem, setDataItem] = React.useState([]);
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("item_id", itemId);
    formData.append("quantity_sold", quantitySold);
    formData.append("date", date);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/transaction`,
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
        Router.push("/transaction");
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
          `${process.env.NEXT_PUBLIC_API_BACKEND}/item`,
          {
            method: "GET",
          }
        );

        const json = await response.json();
        if (json.status === "success") {
          setDataItem(json.data.data);
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
          <span className="text-blue-700 font-bold">Transaksi / </span>
          <span>Tambah Transaksi</span>
        </p>
      </div>

      <div className="py-10 px-8 bg-white border shadow mt-8 rounded-2xl">
        <LinkComponent link="/transaction">Kembali</LinkComponent>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mb-3 grid grid-cols-1 md:grid-cols-12  items-center">
            <label className="text-sm md:col-span-2" htmlFor="nama_barang">
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 md:col-span-10">
              <select
                id="type_id"
                className="py-4 px-2 text-sm w-full border border-gray-300 rounded-xl"
                onChange={(e) => setItemId(e.target.value)}
                required
              >
                <option value="">Pilih</option>
                {dataItem.map((item: Item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InputRowComponent
            label="Jumlah Terjual"
            type="number"
            id="quantity_sold"
            placeholder="Masukan Jumlah Terjual"
            onChange={(e) => setQuantitySold(e.target.value)}
            required
          />

          <InputRowComponent
            label="Tanggal Transaksi"
            type="date"
            id="date"
            placeholder="Masukkan Tanggal Transaksi"
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <ButtonComponent loading={loading} label="Simpan" type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateTransactionPage;
