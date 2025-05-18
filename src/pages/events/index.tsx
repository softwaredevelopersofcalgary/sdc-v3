/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import NewEventModal from "@/components/NewEventModal/NewEventModal";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { IsUserEditor } from "@/hooks/IsUserEditor";
import useUserSession from "@/hooks/useUserSession";
import { api } from "@/utils/api";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from "@chakra-ui/react";
import EventCard from "./EventCard";
import { useRouter } from 'next/router';

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  // const { isError, data, isLoading, error } = api.events.getAll.useQuery();

  const user = useUserSession();
  const userIsEditor = IsUserEditor();

  const router = useRouter();
  const { isReady, query } = router;

  const chapterId =
    isReady && typeof query?.chapterId === "string"
      ? query.chapterId
      : undefined;

  // Note: chapterId! is safe here because `enabled` condition ensures chapterId is defined when the query runs.
  const eventsByChapterQuery = api.events.getAllByChapter.useQuery(
    { chapterId: chapterId },
    { enabled: isReady && !!chapterId }
  );

  // Fetch all events if chapterId is NOT present
  const allEventsQuery = api.events.getAll.useQuery(
    undefined,
    { enabled: isReady && !chapterId } 
  );

  if (!isReady) {
    return <StyledCircleLoader isLoading={true} />;
  }

  const currentQuery = chapterId ? eventsByChapterQuery : allEventsQuery;
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = currentQuery;

  const now = new Date();
  now.setHours(now.getHours() - 24);

  const upcoming = events
    .filter((event) => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = events
    .filter((event) => new Date(event.date) <= now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ChakraProvider>
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
                {upcoming?.map((post, index) => (
                  <EventCard key={post.id ?? index} event={post} />
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mx-16 mt-6 grid gap-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
                {past?.map((post, index) => (
                  <EventCard key={post.id ?? index} event={post} />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}
