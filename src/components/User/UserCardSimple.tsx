import React from "react";
import { Tech2 } from "@/components/ProjectCards/Project.model";
import Image from "next/image";

interface UserCardSimpleProps {
  image: string;
  username: string;
  userTitle: string;
  userTechs: Tech2[];
}

export default function UserCardSimple({
  image,
  username,
  userTitle,
  userTechs,
}: UserCardSimpleProps) {
  return (
    <div className="w-50 max-w-lg rounded-2xl bg-gray-100 py-10 px-8 sm:w-64">
      <div className="flex flex-col items-center justify-center">
        <img
          className="mx-auto h-24 w-24 rounded-full md:h-32 md:w-32"
          src={image || "/images/blank-avatar.png"}
          alt=""
        />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {username}
        </h3>
        <p className="text-sm leading-6 text-gray-400">
          {userTitle || "Chief Fun Officer"}
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-4">
        {userTechs?.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={tech.tech.imgUrl}
              width={30}
              height={30}
              alt={tech.tech.label}
            />
            <span className="text-[9px]">{tech.tech.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
