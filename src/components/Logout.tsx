import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Logout: React.FC = (): JSX.Element => {
  const Router = useRouter();
  const handleLogout = async () => {
    try {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil Login",
        showConfirmButton: false,
        timer: 1500,
      });
      Router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: "Anda belum login",
      });
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto flex items-center"
      >
        <p className="font-bold text-lg">Logout</p>
        <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 ml-2" />
      </button>
    </>
  );
};

export default Logout;
