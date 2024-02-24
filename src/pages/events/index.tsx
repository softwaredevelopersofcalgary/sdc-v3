//@ts-nocheck

import NewEventModal from "@/components/NewEventModal/NewEventModal";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { IsUserEditor } from "@/hooks/IsUserEditor";
import useUserSession from "@/hooks/useUserSession";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventCard from "./EventCard";

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { isError, data, isLoading, error } = api.events.getAll.useQuery();
  const user = useUserSession();
  const userIsEditor = IsUserEditor();

  if (isLoading) return <StyledCircleLoader isLoading={isLoading} />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  console.log("data: ");
  console.log(data);
  const now = new Date();

  // Adjust 'now' to 24 hours ago for comparison
  now.setHours(now.getHours() - 24);

  const upcoming = data
    .filter((event) => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = data
    .filter((event) => new Date(event.date) <= now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <NewEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {userIsEditor && user && (
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
      <Tabs>
        <TabList>
          <Tab>Upcoming</Tab>
          <Tab>Past</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mx-16 mt-6 grid gap-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              {upcoming?.map((post) => (
                <EventCard event={post} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mx-16 mt-6 grid gap-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              {past?.map((post) => (
                <EventCard event={post} />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
