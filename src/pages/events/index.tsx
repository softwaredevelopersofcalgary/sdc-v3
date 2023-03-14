import NewEventModal from "@/components/NewEventModal/NewEventModal";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import useUserSession from "@/hooks/useUserSession";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { isError, data, isLoading, error } = api.events.getAll.useQuery();
  const user = useUserSession();

  if (isLoading) return <StyledCircleLoader isLoading={isLoading} />;
  if (isError) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <NewEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {user && (
        <div className="flex flex-row items-center justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => setIsOpen(true)}
          >
            New Event
          </button>
        </div>
      )}
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
