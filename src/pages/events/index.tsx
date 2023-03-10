import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default function events() {
  const { isError, data, isLoading, error } = api.events.getAll.useQuery();

  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (isLoading) return <StyledCircleLoader isLoading={isLoading} />;

  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {data?.map((post) => (
          <Link href={`/events/${post.id}`} key={post.id}>
            <div className=" min-w-[200px] max-w-sm rounded-lg border-[1.0px] border-gray-300 p-4">
              <p className="text-sm text-gray-500">
                {format(new Date(post.date), "yyyy/MM/dd")} - {post.startTime}
              </p>
              <div className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  {post.location}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.description}
                </p>
              </div>
              <div className="mt-3">
                <div className="text-base font-semibold text-gray-600 hover:text-gray-500">
                  Check event details →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  return <div>events</div>;
}
