import { FC } from "react";

interface IProps {
  name?: string;
  title?: string;
  id?: string;
  checked: boolean;
  onChange: any;
}

const BaseFormRadio: FC<IProps> = ({
  name,
  title,
  checked,
  onChange,
}: IProps) => {
  return (
    <div className="relative flex items-center space-x-2 my-3">
      <input
        id="hs-radio-delete"
        name={name}
        type="radio"
        className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
        aria-describedby="hs-radio-delete-description"
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor="hs-radio-delete" className="">
        <span
          id="hs-radio-delete-description"
          className="block text-sm text-gray-600 dark:text-gray-500"
        >
          {title}
        </span>
      </label>
    </div>
  );
};

export default BaseFormRadio;
