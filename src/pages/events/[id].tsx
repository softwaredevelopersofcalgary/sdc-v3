import EventDetailHeader from "@/components/EventDetailHeader/EventDetailHeader";
import { ProjectModel } from "@/components/ProjectCards/Project.model";
import ProjectCards from "@/components/ProjectCards/ProjectCards";
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

export default function EventDetailPage() {
  const router = useRouter();
  const event = api.events.findUnique.useQuery(
    {
      id: router.query.id as string,
    },
    { enabled: !!router.query.id }
  );
  console.log("🚀 ~ file: [id].tsx:17 ~ EventDetailPage ~ event:", event)

  if (event.isError) return <div>{JSON.stringify(event.error)}</div>;
  if (event.isLoading)
    return <StyledCircleLoader isLoading={event.isLoading} />;

  return (
    <div className="p-4">
      <EventDetailHeader
        date={event.data?.date}
        name={event.data?.name}
        description={event.data?.description}
        location={event.data?.location}
        startTime={event.data?.startTime}
      />
      <ProjectCards
        projects={event.data?.projects as unknown as ProjectModel[]}
      />
    </div>
  );
}
