import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import { api } from "@/utils/api";
import { format } from "date-fns";
import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function EventsPage() {
  const { isError, data, isLoading, error } =
    api.events.getAllWithProjects.useQuery();

  if (isLoading) return <StyledCircleLoader isLoading={isLoading} />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  return (
    <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div
        className="mx-16 mt-6 grid lg:grid-cols-1 lg:gap-x-8 "
        id="accordion-open"
        data-accordion="open"
      >
        {data?.map((event) => (
          <Accordion key={event.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={event.id}
            >
              <span className="grow">
                <h2>{event.name}</h2>
                <span className="text-base text-gray-500">
                  {event.description}
                </span>
              </span>
              <span className="mr-4 flex-none">
                <time>
                  {format(new Date(event.date), "yyyy/MM/dd")} -{" "}
                  {event.startTime}
                </time>
              </span>
            </AccordionSummary>
            <AccordionDetails>
              {event?.projects.map((project) => (
                <Link href={`/events/${project.id}`} key={project.id}>
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
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
