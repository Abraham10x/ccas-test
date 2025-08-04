import { FC } from "react";

interface IProps {
  className?: string;
  label: string;
  name?: string;
  value: any;
  onChange?: any;
  error?: any;
  id?: any;
  checked?: boolean;
}

const BaseFormCheckBox: FC<IProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  error,
  id,
  checked,
}: IProps) => {
  return (
    <div className="w-full my-4">
      <div className="flex flex-row gap-4">
        <div>
          <input
            type="checkbox"
            name={name}
            id={id}
            className={`${className} border-gray-200 rounded text-blue-600 focus:ring-blue-500`}
            value={value}
            onChange={onChange}
            checked={checked}
            aria-describedby="hs-validation-name-error-helper"
          />
        </div>
        <div>
          <label
            htmlFor="hs-validation-name-success"
            className="block text-sm font-medium text-gray-800"
          >
            {label}
          </label>
        </div>
      </div>
      {Boolean(error) && (
        <p className="mt-2 error text-sm text-red-600 error">{error}</p>
      )}
    </div>
  );
};

export default BaseFormCheckBox;
