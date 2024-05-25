import React from "react";
import TagRow from "./TagRow/TagRow";
import { Tag } from "../ProjectCards/Project.model";

enum ProjectTagsUI {
    lookingForHelp,
    beginnerFriendly
};

const ProjectTagsUILabels = [
    {id:ProjectTagsUI.beginnerFriendly, name:"Beginner-friendly project"},
    {id:ProjectTagsUI.lookingForHelp, name:"Looking for help"}

]


export default function ProjectTagRow({ tags, editable }: { tags: Tag[], editable: boolean }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">

    {ProjectTagsUILabels.map((el) => (
        <TagRow label={el.name} key={ String(el.id) } selected={ tags.map(i => i.id).indexOf(String(el.id)) > 0 } />
    ))}
    </div>
  );
}
