import { useDetectOutsideClick } from "@features/hooks/useDetectOutsideClick";
import { FC, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Dropdown: FC<Props> = ({ children, className }: Props) => {
  const domNode: any = useRef();
  const [isActive, setIsActive] = useDetectOutsideClick(domNode, false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mx-auto max-w-lg relative" ref={domNode}>
      <button
        // "inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        className={`${className}`}
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={handleClick}
      >
        {children}
      </button>
      <div
        className={`z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow absolute w-40 transition duration-200 delay-300 ease-in ${
          isActive
            ? "translate-y-0 opacity-100"
            : "-translate-y-40 opacity-0 hidden"
        }`}
        id="dropdown"
      >
        <ul className="py-1" aria-labelledby="dropdown">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
