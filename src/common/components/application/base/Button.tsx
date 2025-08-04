import Link from "next/link";
import { FC } from "react";

interface AppProps {
  children: React.ReactNode;
  className: string;
  link?: string;
  type?: any;
  onClick?: any;
  dataOverlay?: any;
}

export const Button: FC<AppProps> = ({
  children,
  className,
  onClick,
  dataOverlay,
}: AppProps) => {
  return (
    <button
      type="button"
      className={`px-5 py-3 rounded-lg text-sm font-semibold ${className} hover:shadow-xl active:scale-90 
        transition duration-150`}
      onClick={onClick}
      data-hs-overlay={dataOverlay}
    >
      {children}
    </button>
  );
};

export const SubmitButton: FC<AppProps> = ({
  children,
  className,
  type,
  onClick,
}: AppProps) => {
  return (
    <button
      className={`px-5 py-3 rounded-lg text-sm font-semibold ${className} hover:shadow-xl active:scale-90 
        transition duration-150`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const LinkButton: FC<AppProps> = ({
  children,
  className,
  link,
  onClick,
}: AppProps) => {
  return (
    <Link href={link ?? "#"}>
      <button className={`px-5 py-3 rounded-lg ${className}`} onClick={onClick}>
        {children}
      </button>
    </Link>
  );
};
