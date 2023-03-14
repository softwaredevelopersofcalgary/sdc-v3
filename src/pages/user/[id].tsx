/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import StyledCircleLoader from "@/components/StyledCircleLoader/StyledCircleLoader";
import UserForm from "@/components/UserForm/UserForm";
import UserTechsModal from "@/components/UserTechsModal/UserTechsModal";
import { api } from "@/utils/api";
import { Autocomplete, TextField } from "@mui/material";
import { MasterTech } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export interface ProfileEditProps {
  title: string;
  github: string;
  twitter: string;
  linkedin: string;
  website: string;
}

export default function UserDetail() {
  const router = useRouter();
  const utils = api.useContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<MasterTech[]>([]);

  const techs = api.techs.getAll.useQuery();
  const { mutateAsync: updateUser } = api.users.update.useMutation({
    onSuccess: async () => {
      await utils.users.getById.invalidate({
        id: router.query.id as string,
      });
    },
  });

  const {
    data: userData,
    isLoading,
    isError,
  } = api.users.getById.useQuery(
    {
      id: router.query?.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );
  console.log("🚀🚀 ~ file: [id].tsx:32 ~ UserDetail ~ userData:", userData);

  const onSubmit = async (data: ProfileEditProps) => {
    console.log(
      "🚀🚀🚀🚀 ~ file: [id].tsx:25 ~ UserDetail ~ selectedTechs:",
      selectedTechs
    );

    await updateUser({
      id: router.query.id as string,
      title: data.title,
      github: data.github,
      twitter: data.twitter,
      linkedin: data.linkedin,
      website: data.website,
      techs: selectedTechs.map((tech: MasterTech) => tech.id),
    });
  };

  if (isLoading || techs.isLoading)
    return <StyledCircleLoader isLoading={isLoading} />;
  if (isError || techs.isError) return <div>Error!!</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div
        key={userData?.id}
        className="w-50 max-w-lg rounded-2xl bg-gray-100 py-10 px-8 sm:w-64"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            className="mx-auto h-24 w-24 rounded-full md:h-32 md:w-32"
            src={userData?.image || "/images/blank-avatar.png"}
            alt=""
          />
          <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
            {userData?.name}
          </h3>
          <p className="text-sm leading-6 text-gray-400">{"CPO"}</p>
        </div>
        <div className="mt-6 flex flex-row justify-center gap-x-6 ">
          {userData?.github && (
            <div>
              <a
                href={userData?.github}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Github</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                </svg>
              </a>
            </div>
          )}
          {userData?.linkedin && (
            <div>
              <a
                href={userData?.linkedin}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          )}
          {userData?.twitter && (
            <div>
              <a
                href={userData?.twitter}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          )}
          {userData?.website && (
            <div>
              <a
                href={userData?.website}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <UserForm user={userData} onSubmit={onSubmit} setIsOpen={setIsOpen} />
        <UserTechsModal
          userId={userData?.id}
          ogTechs={userData?.techs}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={techs?.data}
          selectedTechs={selectedTechs}
          setSelectedTechs={setSelectedTechs}
        />
      </div>
    </div>
  );
}
