import React from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import EventDetailHeader from "@/components/EventDetailHeader/EventDetailHeader";
import ProjectCards from "@/components/ProjectCards/ProjectCards";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { ProjectModel } from "@/components/ProjectCards/Project.model";

type Member = {
  name: string | null;
  id: string;
  isCurrentUserMember?: boolean;
};

type EventWithProjects = {
  projects: ProjectModel[];
  // other properties
};

function isEventWithProjects(eventData: any): eventData is EventWithProjects {
  return !!eventData && Array.isArray(eventData.projects);
}


type EventWithMembers = {
  members: Member[];
  projects: any[]; // Consider defining a more specific type
  id?: string;
  name?: string;
  date?: Date;
  location?: string;
  description?: string;
  startTime?: string;
  updatedAt?: Date;
};

export default function EventDetailPage() {
  const router = useRouter();
  const event = api.events.findUnique.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id }
  );

  if (event.isError) return <div>{JSON.stringify(event.error)}</div>;
  if (event.isLoading) return <StyledCircleLoader isLoading={event.isLoading} />;

  const isUserAttendEvent = event.data != null && 'members' in event.data && Array.isArray(event.data.members) ?
    event.data.members.some((member: Member) => member.isCurrentUserMember) : false;

  return (
    <div className="p-4">
      <EventDetailHeader
        eventId={router.query.id as string}
        date={event.data?.date}
        name={event.data?.name}
        description={event.data?.description}
        location={event.data?.location}
        startTime={event.data?.startTime}
        isUserAttendEvent={isUserAttendEvent}
      />
      <ProjectCards
        projects={
          isEventWithProjects(event.data) ? event.data.projects : []
        }
        isUserAttendEvent={isUserAttendEvent}
      />
    </div>
  );
}
