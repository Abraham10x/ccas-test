import Dropdown from "@components/dashboard/Dropdown";
import { FC, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

interface Props {
  items: any;
  index: number;
}
const MenuItems: FC<Props> = ({ items, index }: Props) => {
  const [dropdown, setDropdown] = useState(true);

  const handledropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <li key={index} className={`text-white text-sm cursor-pointer mt-4`}>
      {/* ${!isOpen && "hidden"}  */}
      {items.children ? (
        <>
          <button
            aria-expanded={dropdown ? "true" : "false"}
            className="flex items-center justify-between hover:bg-side-light p-2 rounded-md w-full"
            onClick={handledropdown}
          >
            <div className="flex items-center justify-between gap-4">
              {items.icon === null ? (
                ""
              ) : (
                <Image
                  className=""
                  alt={items.title}
                  src={`/img/dashboard/icons/${items.icon}.svg`}
                  height={25}
                  width={25}
                />
              )}
              <span className={`origin-left duration-200 truncate`}>
                {items.title}
              </span>
            </div>

            <MdArrowRight
              className={`${
                dropdown ? "rotate-0" : "rotate-90"
              } duration-200 h-6 w-6 `}
            />
          </button>
          <Dropdown submenus={items.children} dropdown={dropdown} />
        </>
      ) : (
        <Link href={`/dashboard/${items.link}` || "#"}>
          <div className="flex items-center gap-4 hover:bg-side-light p-2 rounded-md ">
            {items.icon === null ? (
              ""
            ) : (
              <Image
                className="h-6"
                alt={items.title}
                src={`/img/dashboard/icons/${items.icon}.svg`}
                height={25}
                width={25}
              />
            )}
            <span className={`origin-left duration-200 truncate`}>
              {items.title}
            </span>
          </div>
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
