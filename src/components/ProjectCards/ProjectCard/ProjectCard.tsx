/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import CommentBubble from "@/components/Comments/CommentTextArea/CommentBubble/CommentBubble";
import CommentTextArea, {
  CommentTextAreaValues,
} from "@/components/Comments/CommentTextArea/CommentTextArea";
import PillButton from "@/components/atoms/PillButton/PillButton";
import useUserSession from "@/hooks/useUserSession";
import { api } from "@/utils/api";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import TechTagRow from "../../TechTagRow/TechTagRow";
import { ProjectModel } from "../Project.model";
import MemberTagRow from "@/components/atoms/MemberTagRow/MemberTagRow";

interface ProjectCardProps {
  project: ProjectModel;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const utils = api.useContext();
  const user = useUserSession();

  const { handleSubmit, register, reset } = useForm();
  const { mutateAsync: createComment, isLoading } =
    api.projects.createComment.useMutation({
      onSuccess: async () => {
        await utils.events.findUnique.invalidate({
          id: project.eventId,
        });
      },
    });

  const onCommentSubmit = async (data: CommentTextAreaValues) => {
    await createComment({
      comment: data.comment,
      projectId: project.id,
      authorId: user?.id || "",
    });

    reset();
  };

  const { mutateAsync } = api.likes.create.useMutation({
    onSuccess: async () => {
      await utils.events.findUnique.invalidate({
        id: project.eventId,
      });
      await utils.likes.findUnique.invalidate({
        projectId: project.id,
      });
    },
  });

  const { data: likeExists } = api.likes.findUnique.useQuery(
    {
      projectId: project?.id,
      userId: user?.id || "",
    },
    {
      enabled: !!user?.id,
    }
  );

  const { mutateAsync: joinProject, isLoading: joinProjectIsLoading } =
    api.projects.joinProject.useMutation({
      onSuccess: async () => {
        await utils.events.findUnique.invalidate({
          id: project.eventId,
        });
      },
    });

  const { mutateAsync: leaveProject, isLoading: leaveProjectIsLoading } =
    api.projects.leaveProject.useMutation({
      onSuccess: async () => {
        await utils.events.findUnique.invalidate({
          id: project.eventId,
        });
      },
    });

  const handleJoinProject = async () => {
    await joinProject({
      projectId: project.id,
      userId: user?.id || "",
    });
  };

  const handleLeaveProject = async () => {
    await leaveProject({
      projectId: project.id,
      userId: user?.id || "",
    });
  };

  const handleUpvote = async () => {
    await mutateAsync({
      projectId: project.id,
      userId: user?.id || "",
    });
  };

  return (
    <div
      key={project.id}
      className="flex w-full flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <div className="mt-2 block">
            <div className="text-xl font-semibold text-gray-700">
              {project.name}
            </div>
            <div className="py-2">
              <TechTagRow techs={project.techs} />
            </div>
            <div className="py-2">
              <PillButton
                label={
                  joinProjectIsLoading || leaveProjectIsLoading
                    ? "Loading..."
                    : project.isMember
                    ? "Leave Project"
                    : "Join Project"
                }
                isMember={project?.isMember}
                isUserPartOfAnyProject={project.isUserPartOfAnyProject}
                isLoading={joinProjectIsLoading || leaveProjectIsLoading}
                handleClick={
                  joinProjectIsLoading || leaveProjectIsLoading
                    ? () => void null
                    : project?.isMember
                    ? handleLeaveProject
                    : handleJoinProject
                }
              />
            </div>
            {project.members && project.members?.length > 0 && (
              <div className="flex flex-row flex-wrap items-center gap-2 text-sm font-light">
                <span className="font-bold">Members:</span>
                <MemberTagRow members={project?.members} />
              </div>
            )}
            <div className="mt-3 text-base text-gray-500">
              {project.description}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-10">
            <div>
              <span className="text-sm font-medium text-gray-900">
                {project.author.name}
              </span>
              <div className="flex space-x-1 text-sm text-gray-500">
                <div>
                  {format(new Date(project.createdAt), "MMMM dd, yyyy")}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {user ? (
                likeExists ? (
                  <HandThumbUpIconSolid
                    onClick={handleUpvote}
                    className="block h-6 w-6 cursor-pointer text-gray-700"
                  />
                ) : (
                  <HandThumbUpIcon
                    onClick={handleUpvote}
                    className="block h-6 w-6 cursor-pointer text-gray-700"
                  />
                )
              ) : null}
            </motion.div>
            <div>{project._count?.likes ?? 0} Likes</div>
          </div>
        </div>
        {user && (
          <div className="pt-4">
            <CommentTextArea
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              register={register}
              onSubmit={onCommentSubmit}
              rows={2}
            />
          </div>
        )}
        {project.comments?.map((comment) => (
          <CommentBubble
            key={comment.id}
            image={comment.user?.image}
            username={comment.user.name}
            createdAt={comment.createdAt}
            comment={comment.comment}
            userTitle={comment.user.title}
            userTechs={comment.user.techs}
          />
        ))}
      </div>
    </div>
  );
}
