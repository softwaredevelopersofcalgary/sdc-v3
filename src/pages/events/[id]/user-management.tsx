// @ts-nocheck

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import MemberTagRow from "@/components/atoms/MemberTagRow/MemberTagRow";

function UserManagement() {
  const router = useRouter();
  const eventId = router.query.id as string;
  const event = api.events.findUnique.useQuery(
    {
      id: eventId,
    },
    { enabled: !!router.query.id }
  );

  console.log(`EventId: ${eventId}`);
  const {
    data: usersNotAttending,
    isLoading: usersNotAttendingEventIsLoading,
    isError,
  } = api.events.getAllUsersAttendingEventButNotInProjects.useQuery(
    {
      eventId: router.query?.id as string,
    },
    {
      onSuccess: (data) => {
        console.log(
          "Users not attending any project but part of the event:",
          data
        );

        console.log("Here's the event ID: ", eventId);
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
    }
  );

  const handleAssignUsers = async () => {
    await autoAssignUsers({
      eventId,
    });
    event.refetch();
  };

  const {
    mutate: autoAssignUsers,
    isLoading: isAutoAssignLoading,
    error: autoAssignError,
  } = api.events.autoAssignUsersToProjects.useMutation({
    onSuccess: (data: any) => {
      // console.log("Users successfully assigned to projects.");
      // You may want to invalidate or refetch relevant queries here
    },
    onError: (error) => {
      console.error("Error during auto-assignment:", error);
    },
  });
  if (event.isLoading || isAutoAssignLoading)
    return <StyledCircleLoader isLoading={event.isLoading} />;
  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <ul className="col-span-1 mb-4">
          {usersNotAttendingEventIsLoading ? (
            <StyledCircleLoader isLoading={usersNotAttendingEventIsLoading} />
          ) : (
            usersNotAttending?.length === 0 && (
              <li className="mt-3  mr-3 text-base text-green-500">
                No users without projects!
              </li>
            )
          )}
          <li>
            <strong>Users Not part of Any Project Yet:</strong>
            <div className="flex flex-row flex-wrap items-center gap-2 text-sm font-light">
              <MemberTagRow members={usersNotAttending} />
            </div>
          </li>
          <li className="mt-4 mb-2 flex justify-between">
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => handleAssignUsers()}
            >
              Auto Assign
            </button>
          </li>
        </ul>

        <div className="col-span-2 flex flex-col sm:flex-row">
          {event.data?.projects?.map((project) => (
            <Link
              href={`/events/${project.id}`}
              key={project.id}
              className="flex-grow"
            >
              <div className="min-w-[200px] rounded-lg border-[1.0px] border-gray-300 p-4">
                <div className="mt-2 block">
                  <p className="mt-3 text-base text-gray-500">
                    {project.name.length <= 150
                      ? project.name
                      : project.name.substring(0, 150) + "[...]"}
                  </p>
                  <div className="mt-3 text-base text-gray-400">
                    <div className="flex flex-row flex-wrap items-center gap-2 text-sm font-light">
                      <span className="font-bold">Members:</span>
                      <MemberTagRow members={project.members} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-base text-gray-400">
                  <p>Tech Stack:</p>
                  <div className="text-base text-gray-600 hover:text-gray-500">
                    {project.techs.length > 0 ? (
                      project.techs.map((tech) => (
                        <div
                          key={tech.id}
                          className="mt-3 mr-3 text-base text-gray-800"
                        >
                          <span>{tech.label}</span>
                        </div>
                      ))
                    ) : (
                      <span className="mt-3  mr-3 text-base text-orange-500">
                        No Tech Stack
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
