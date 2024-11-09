"use client";

import Image from "next/image";
import Logo from "@/assets/logo.png";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const Router = useRouter();

  const handlerLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil Login",
        showConfirmButton: false,
        timer: 1500,
      });
      Router.push("/type");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: "Anda belum login",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg px-10 py-10 rounded-3xl min-w-96">
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo Dinas Perpstakaan dan Arsip Kabupaten Indramayu"
              width={200}
            />
          </div>
          <p className="text-center text-sm font-bold my-6">
            Selamat Datang di Aplikasi Metadata dan Dalev!
          </p>

          <form onSubmit={handlerLogin}>
            <InputComponent
              label="Username"
              type="text"
              placeholder="Masukan Username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <InputComponent
              label="Password"
              type="password"
              placeholder="Masukan Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <ButtonComponent loading={loading} type="submit" label="Masuk" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
