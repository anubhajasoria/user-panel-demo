import React from "react";

interface ButtonProps {
  title: string;
  primaryType?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  primaryType = true,
  onClick = () => {},
  disabled = false,
  className = "",
}) => {
  const secondary =
    " cursor-pointer  whitespace-nowrap text-primary border border-primary rounded-lg px-4 py-2.5 text-center  ";
  const primary =
    "  whitespace-nowrap bg-gradient-to-r text-white from-primary to-indigo-600 rounded-lg px-4 py-2.5 text-center  ";

  return (
    <button
      type="button"
      className={`${primaryType ? primary : secondary} ${
        disabled ? " pointer-events-none opacity-60" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
