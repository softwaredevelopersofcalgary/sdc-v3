import React from "react";

const TagRow = ({ label, key, selected }: { label: string; key: string, selected: boolean}) => {
  return (
    <span
      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5  text-xs font-medium text-gray-800"
      key={key}>{selected}{label}
    </span>
  );
};

export default TagRow;
