import React from "react";

interface MemberTagProps {
  label: string;
}

export default function MemberTag({ label }: MemberTagProps) {
  return (
    <span className="inline-flex items-center rounded-full border-[1px] border-gray-500 bg-gray-100  px-2.5 py-0.5 text-xs font-medium text-gray-800">
      {label}
    </span>
  );
}
