import { FC } from "react";
import Select from "react-select";

interface IProps {
  className?: string;
  label?: string;
  onChange?: any;
  options?: any;
  value?: any;
  error?: string;
  onBlur?: any;
  placeholder?: string;
  instanceId?: any;
  disabled?: boolean;
}

const BaseFormSelectSearch: FC<IProps> = ({
  label,
  className,
  onChange,
  options,
  value,
  error,
  onBlur,
  placeholder,
  instanceId,
  disabled
}: IProps) => {
  const defaultValue = (options: any[], value: any) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  return (
    <div className={`${className} w-full mt-5`}>
      <label
        htmlFor="select-mda"
        className="text-sm block font-bold text-gray-700"
      >
        {label}
      </label>
      <Select
        id={instanceId}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={defaultValue(options, value)}
        isSearchable
        isDisabled={disabled}
      />
      {Boolean(error) && (
        <p className="my-2 text-sm text-red-600 error">{error}</p>
      )}
    </div>
  );
};

export default BaseFormSelectSearch;
