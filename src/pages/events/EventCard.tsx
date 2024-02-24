// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { format } from "date-fns";
import Link from "next/link";
import React from "react";

interface EventProps {
  event: object;
}

export default function EventCard({ event }: EventProps) {
  return (
    <Link href={`/events/${event.id}`} key={event.id}>
      <div className="min-w-[200px] rounded-lg border-[1.0px] border-gray-300 p-4">
        <p className="text-sm text-gray-500">
          {format(new Date(event.date), "yyyy/MM/dd")} - {event.startTime}
        </p>
        <div className="mt-2 block">
          <p className="text-xl font-semibold text-gray-900">{event.name}</p>
          <p className="mt-3 text-base text-gray-500">
            {event.description.length <= 150
              ? event.description
              : event.description.substring(0, 150) + "[...]"}
          </p>
        </div>
        <div className="mt-3">
          <div className="text-base font-semibold text-gray-600 hover:text-gray-500">
            Check event details →
          </div>
        </div>
      </div>
    </Link>
  );
}
