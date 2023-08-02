import React from "react";

const TechTag = ({ tech, key }: { tech: string; key: string }) => {
  return (
    <span
      key={key}
      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5  text-xs font-medium text-gray-800"
    >
      {tech}
    </span>
  );
};

export default TechTag;
