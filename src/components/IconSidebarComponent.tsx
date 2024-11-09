import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { on } from "events";
import Link from "next/link";

interface IconSidebarProps {
  label: string;
  icon: IconProp;
  link: string;
  active?: boolean;
  onClick?: () => void;
}

const IconSidebarComponent: React.FC<IconSidebarProps> = ({
  label,
  icon,
  link,
  active,
  onClick,
}) => {
  return (
    <Link
      href={link}
      className={`flex mb-2 px-4 py-5 items-center rounded-2xl group ${
        active ? "bg-blue-500 text-white" : "bg-white text-black"
      } hover:text-white hover:bg-blue-500 transition-all duration-200`}
      onClick={onClick}
    >
      <FontAwesomeIcon className="w-6" icon={icon} />
      <p className="ml-4 text-base">{label}</p>
    </Link>
  );
};

export default IconSidebarComponent;
