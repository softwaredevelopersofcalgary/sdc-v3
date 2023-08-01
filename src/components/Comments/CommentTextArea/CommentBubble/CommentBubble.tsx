/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import React from "react";
import { Popover } from "antd";
import { Tech2 } from "@/components/ProjectCards/Project.model";
import UserCardSimple from "@/components/User/UserCardSimple";

interface CommentBubbleProps {
  image: string;
  username: string;
  createdAt: string;
  comment: string;
  userTitle: string;
  userTechs: Tech2[];
}

export default function CommentBubble({
  image,
  username,
  createdAt,
  comment,
  userTechs,
  userTitle,
}: CommentBubbleProps) {
  return (
    <div className="flex w-full flex-row items-start gap-4 pt-6">
      <Popover
        content={
          <UserCardSimple
            image={image}
            userTechs={userTechs}
            username={username}
            userTitle={userTitle}
          />
        }
      >
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={image || "/images/blank-avatar.png"}
            alt=""
          />
        </div>
      </Popover>
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
