import React from "react";

interface PillButtonProps {
  label: string;
  handleClick: () => void;
}

export default function PillButton({ label, handleClick }: PillButtonProps) {
  return (
    <div
      className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-5 py-2  text-xs font-bold text-gray-800"
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
