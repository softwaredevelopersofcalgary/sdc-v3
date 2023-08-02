import React from "react";
import TechTag from "./TechTag/TechTag";
import { Tech2 } from "../ProjectCards/Project.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TechTagRow({ techs }: { techs: Tech2[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {techs.map((tech) => (
        <TechTag tech={tech?.tech?.label} key={tech?.id} />
      ))}
    </div>
  );
}
