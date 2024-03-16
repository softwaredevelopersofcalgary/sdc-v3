import React from 'react';
import { Popover } from 'antd';

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
  const title =   isMember
    ? 'Leave Project'
    : isUserPartOfAnyProject
      ? 'You\'re already a member of a different project'
      : 'Join Project'

  const ButtonElement = <button
    title={title}
    disabled={isMember ? false : !!isUserPartOfAnyProject}
    className={`
      ${
      isLoading
        ? 'cursor-not-allowed'
        : isMember
          ? 'cursor-pointer border-gray-500 bg-gray-100 text-gray-800'
          : isUserPartOfAnyProject
            ? 'cursor-not-allowed border-red-500 bg-red-100 text-red-800 disabled:bg-red-100'
            : 'cursor-pointer border-gray-500 bg-gray-100 text-gray-800 disabled:bg-gray-100'
    }
      inline-flex items-center rounded-full border-2 px-5 py-2 text-xs font-bold `}
    onClick={handleClick}
  >
    {label}
  </button>;

  return (!isMember && isUserPartOfAnyProject
    ? <Popover content={title} placement="topLeft">
      <div className="relative">
        {ButtonElement}
      </div>
    </Popover>
    : ButtonElement);
}
