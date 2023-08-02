import Image from "next/image";
import React from "react";

export default function JoinPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <span className="text-base font-light">
        Would you like to join the community? Join Here!
      </span>
      <div className="flex flex-row items-center justify-center gap-4">
        <img className="h-20" src="/logos/discord-mark-blue.png" />
        <img className="h-20" src="/logos/meetup.png" />
      </div>
    </div>
  );
}
