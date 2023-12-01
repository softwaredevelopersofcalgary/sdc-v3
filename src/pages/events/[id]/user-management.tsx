import React from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";

function UserManagement() {
  const router = useRouter();
  const eventId = router.query.id as string;
  const event = api.events.findUnique.useQuery(
    {
      id: eventId,
    },
    { enabled: !!router.query.id }
  );
  const {
    data: usersNotAttending,
    isLoading: usersNotAttendingEventIsLoading,
  } = api.events.getAllUsersAttendingEventButNotInProjects.useQuery(
    {
      eventId,
    },
    {
      onSuccess: (data) => {
        // console.log(
        //   "Users not attending any project but part of the event:",
        //   data
        // );
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
          <li className="mb-2 flex justify-between">
            <strong>Free Users in this event:</strong>
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => handleAssignUsers()}
            >
              Auto Assign
            </button>
          </li>
          {usersNotAttending?.length === 0 && (
            <li className="mt-3  mr-3 text-base text-green-500">
              No free users!
            </li>
          )}
          {usersNotAttending?.map((user, key) => (
            <li key={key}>{user.name}</li>
          ))}
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
                  <p className="text-xl font-semibold text-gray-900">
                    {project.location}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {project.description.length <= 150
                      ? project.description
                      : project.description.substring(0, 150) + "[...]"}
                  </p>
                  <div className="mt-3 text-base text-gray-400">
                    <p>Members:</p>
                    {project.members.length > 0 ? (
                      project.members.map((member) => (
                        <span
                          key={member.id}
                          className="mt-3 mr-3 text-base text-gray-800"
                        >
                          {member.name}
                        </span>
                      ))
                    ) : (
                      <span className="mt-3  mr-3 text-base text-orange-500">
                        No Members
                      </span>
                    )}
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
