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

type EventData = {
  members?: Member[];
  projects?: any[];
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

  const isUserAttendEvent = (event.data as EventData)?.members?.some(member => member.isCurrentUserMember) ?? false;

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
        projects={(event.data as EventData)?.projects as unknown as ProjectModel[]}
        isUserAttendEvent={isUserAttendEvent}
      />
    </div>
  );
}
