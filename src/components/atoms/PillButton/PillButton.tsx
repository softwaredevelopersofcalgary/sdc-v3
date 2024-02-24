import React, {useState} from "react";

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

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
    <button
      title={
        isMember
          ? "Leave Project"
          : isUserPartOfAnyProject
          ? "You're already a member of a different project"
          : "Join Project"
      }
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      disabled={isMember ? false : !!isUserPartOfAnyProject}
      className={`
      ${
        isLoading
          ? "cursor-not-allowed"
          : isMember
          ? "cursor-pointer border-gray-500 bg-gray-100 text-gray-800"
          : isUserPartOfAnyProject
          ? "cursor-not-allowed border-red-500 bg-red-100 text-red-800 disabled:bg-red-100"
          : "cursor-pointer border-gray-500 bg-gray-100 text-gray-800"
      }
      inline-flex items-center rounded-full border-2 px-5 py-2 text-xs font-bold `}
      onClick={handleClick}
    >
      {label}
    </button>

      {!isMember && isUserPartOfAnyProject && true &&
        <div className="absolute bg-gray-400 text-white p-2 rounded mt-2 bottom-0 left-36 w-1/2">
          {"You're already a member of a different project"}
        </div>
      }
    </div>
  );
}
