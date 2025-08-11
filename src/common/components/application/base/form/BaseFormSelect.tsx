import { FC } from "react";

interface IProps {
  label?: string;
  name?: string;
  className?: any;
  disabledValue?: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  value: any;
  onBlur?: any;
  onChange?: any;
  data: any[];
  style?: any;
  error?: string;
  touched?: any;
  enabled?: boolean;
  disabled?: any;
}

const BaseFormSelect: FC<IProps> = ({
  label,
  name,
  className,
  disabledValue,
  placeholder,
  optionLabel,
  optionValue,
  value,
  onBlur,
  onChange,
  touched,
  enabled,
  data,
  style,
  disabled,
  error,
}: IProps) => {
  return (
    <div className="w-full mt-5">
      {label && (
        <label
          htmlFor="hs-validation-name-success"
          className="text-sm block font-bold text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        value={value}
        name={name}
        onBlur={onBlur}
        disabled={disabled}
        onChange={onChange}
        className={`${className} block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100`}
      >
        {disabledValue && (
          <option disabled value="">
            {disabledValue}
          </option>
        )}

        {!disabledValue && enabled ? (
          <option value="">{placeholder}</option>
        ) : (
          <option disabled value="">
            {placeholder}
          </option>
        )}

        {data &&
          data.map((item: any, index: number) => {
            const setValue = optionValue ? item[optionValue] : item;
            let setLabel = optionLabel ? item[optionLabel] : item;

            if (typeof setLabel === "object") {
              setLabel = JSON.stringify(item);
            } else if (Array.isArray && Array.isArray(setLabel)) {
              setLabel = JSON.stringify(item);
            }

            return (
              <option
                value={setValue}
                key={`${JSON.stringify(item)} + ${index}`}
              >
                {setLabel}
              </option>
            );
          })}
      </select>
      {Boolean(error) && (
        <p className="mt-2 text-sm text-red-600 error">{error}</p>
      )}
    </div>
  );
};

export default BaseFormSelect;
