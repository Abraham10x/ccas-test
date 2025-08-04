import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import Image from "next/image";
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
interface IProps {
  type?: string;
  label?: string;
  placeholder?: string;
  className?: any;
  name?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  error?: any;
  disabled?: any;
  isUploaded?: any;
  progressValue?: any;
  accept?: any;
  id?: any;
}

export function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const BaseFormInput: FC<IProps> = ({
  label,
  type,
  placeholder,
  className,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  isUploaded,
  progressValue,
  accept,
  id,
}: IProps) => {
  const [eyeOff, setEyeOff] = useState(true);

  if (type === "password") {
    return (
      <div className="w-full mt-3">
        {label != null && (
          <label
            htmlFor="hs-validation-name-success"
            className="text-sm my-1 block font-bold  text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            type={eyeOff ? type : "text"}
            name={name}
            placeholder={placeholder}
            className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-describedby="hs-validation-name-success-helper"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setEyeOff(!eyeOff)}
          >
            {eyeOff ? (
              <EyeOffIcon className="h-6 w-6 text-gray-400" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </div>
        {Boolean(error) && (
          <p className="mt-2 text-sm text-red-600 error">{error}</p>
        )}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={`w-full mt-3 ${className}`}>
        <label
          htmlFor="hs-validation-name-success"
          className="text-sm my-1 block font-bold  text-gray-700"
        >
          {label}
        </label>
        <textarea
          id={name}
          className="block w-full rounded-md border-[1px] py-4 px-4 text-base text-gray-500 bg-gray-100"
          rows={3}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        ></textarea>
        {Boolean(error) && (
          <p className="my-2 text-sm text-red-600 error">{error}</p>
        )}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="w-full mt-3">
        <label
          htmlFor="hs-validation-name-success"
          className="text-sm my-1 block font-bold  text-gray-700"
        >
          {label}
        </label>
        <input
          className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
          type="date"
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
        />
        {Boolean(error) && (
          <p className="my-2 text-sm text-red-600 error">{error}</p>
        )}
      </div>
    );
  }

  if (type === "file") {
    return (
      <div
        className={`${className} rounded-lg border-[2px] py-5 px-4 text-base text-gray-500 bg-gray-100 border-[#E5E7EB] border-dashed mt-3`}
      >
        <label htmlFor={name} className="flex flex-col cursor-pointer">
          <Image
            className="mx-auto mt-2"
            src="/img/icons/file-upload.svg"
            alt="file-icon"
            width={48}
            height={48}
          />
          <p className="text-gray-900 font-bold text-center text-sm mt-2">
            Upload Your {label} Here
          </p>
          <p className="text-gray-600 text-center text-xs w-full sm:w-[60%] mx-auto">
            Note: Your File should not be more than 3mb to 8mb
          </p>
          <p className="text-gray-600 text-center text-xs w-full sm:w-[60%] mx-auto">
            {isUploaded}
          </p>
          {progressValue}
        </label>
        <input
          id={name}
          className="hidden w-full"
          type="file"
          onChange={onChange}
          name={name}
          value={value}
          // eslint-disable-next-line react/no-unknown-property
          placeholder={placeholder}
          accept={accept}
          // eslint-disable-next-line react/no-unknown-property
          // validate={validate}
        />
      </div>
    );
  }

  if (name === "search") {
    return (
      <div className="relative mt-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id={name}
          type="text"
          className={`${className} block w-full rounded-lg border-[1px] border-outline-gray p-2 pl-10 text-sm text-gray-600 font-medium`}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-3">
      <label
        htmlFor="hs-validation-name-error"
        className="text-sm my-1 block font-bold  text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type="text"
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${className} block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100`}
          value={value}
          onChange={onChange}
          aria-describedby="hs-validation-name-error-helper"
        />
      </div>
      {Boolean(error) && (
        <p className="mt-2 error text-sm text-red-600 error">{error}</p>
      )}
    </div>
  );
};

export default BaseFormInput;
