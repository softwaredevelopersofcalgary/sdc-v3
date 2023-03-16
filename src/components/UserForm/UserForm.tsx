/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ProfileEditProps } from "@/pages/user/[id]";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface UserFormProps {
  user:
    | (User & {
        techs: {
          id: string;
          tech: {
            label: string;
            imgUrl: string;
          };
        }[];
      })
    | null;
  onSubmit: (data: ProfileEditProps) => Promise<void>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserForm({ user, onSubmit, setIsOpen }: UserFormProps) {
  const { handleSubmit, register } = useForm<ProfileEditProps>({
    defaultValues: {
      title: user?.title || "",
      github: user?.github || "",
      twitter: user?.twitter || "",
      linkedin: user?.linkedin || "",
      website: user?.website || "",
    },
  });

  const handleTechEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <form
      // ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 sm:space-y-5"
    >
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Title
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            {...register("title")}
            id="title"
            placeholder={"Chief Fun Officer"}
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="github"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Github
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="github"
            {...register("github")}
            autoComplete="github"
            placeholder="Github address"
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Linkedin
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="linkedin"
            {...register("linkedin")}
            autoComplete="linkedin"
            placeholder="Linkedin address"
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="twitter"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Twitter
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            id="twitter"
            {...register("twitter")}
            autoComplete="twitter"
            placeholder="Twitter Address"
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="website"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Website
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            id="website"
            type="text"
            {...register("website")}
            autoComplete="website"
            placeholder="Website Address"
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          Tech Skills
        </label>
        <div className="mt-2 flex w-full flex-row items-center justify-between">
          <div className="flex w-full max-w-xs flex-row flex-wrap items-center gap-2">
            {user?.techs.map((tech) => (
              <div
                key={tech.id}
                className="flex flex-row items-center gap-1 rounded-2xl border-[1px] border-gray-700 px-2 py-1"
              >
                <Image
                  src={tech.tech.imgUrl}
                  alt={tech.tech.label}
                  width={15}
                  height={15}
                />
                <span>{tech.tech.label}</span>
              </div>
            ))}
          </div>
          <button
            className="rounded-md bg-gray-700 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
            onClick={handleTechEdit}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-gray-700 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
        >
          Save
        </button>
      </div>
    </form>
  );
}
