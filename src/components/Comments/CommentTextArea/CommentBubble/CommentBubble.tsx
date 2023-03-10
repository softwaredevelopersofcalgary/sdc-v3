/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import React from "react";

interface CommentBubbleProps {
  image: string;
  username: string;
  createdAt: string;
  comment: string;
}

export default function CommentBubble({
  image,
  username,
  createdAt,
  comment,
}: CommentBubbleProps) {
  return (
    <div className="flex w-full flex-row items-start gap-4 pt-6">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={image || "/images/blank-avatar.png"}
          alt=""
        />
      </div>
      <div className="w-full rounded-lg bg-gray-50 p-3">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="text-lg font-semibold">{username}</div>
          <div className="font-base text-sm">
            {format(new Date(createdAt), "HH:mm MMMM dd, yyyy")}
          </div>
        </div>
        <div className="pt-2 text-base font-light">
          <div>{comment}</div>
        </div>
      </div>
    </div>
  );
}
