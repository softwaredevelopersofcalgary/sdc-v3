// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Member } from "@/components/ProjectCards/Project.model";
import React from "react";
import MemberTag from "./MemberTag";

interface MemberTagRowProps {
  members: any[] | undefined;
}

export default function MemberTagRow({ members }: MemberTagRowProps) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {members?.map((member) => (
        <MemberTag label={member?.name} key={member?.id} />
      ))}
    </div>
  );
}
