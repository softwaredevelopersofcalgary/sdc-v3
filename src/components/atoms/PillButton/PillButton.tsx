import React from "react";

interface PillButtonProps {
  label: string;
  handleClick: () => void;
  isMember: boolean | undefined;
  isUserPartOfAnyProject: boolean | undefined;
  isLoading: boolean;
}

export default function PillButton({
  label,
  handleClick,
  isMember,
  isUserPartOfAnyProject,
  isLoading,
}: PillButtonProps) {
  return (
    <button
      title={
        isMember
          ? "Leave Project"
          : isUserPartOfAnyProject
          ? "You're already a member of a different project"
          : "Join Project"
      }
      disabled={isMember ? false : isUserPartOfAnyProject ? true : false}
      className={`
      ${
        isLoading
          ? "cursor-not-allowed"
          : isMember
          ? "cursor-pointer border-gray-500 bg-gray-100 text-gray-800"
          : isUserPartOfAnyProject
          ? "cursor-not-allowed border-red-500 bg-red-100 text-red-800"
          : "cursor-pointer border-gray-500 bg-gray-100 text-gray-800"
      }
      inline-flex items-center rounded-full border-2 px-5 py-2 text-xs font-bold `}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
