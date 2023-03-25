import { api } from "@/utils/api";
import useUserSession from "./useUserSession";

export const IsUserEditor = () => {
  const user = useUserSession();

  if (!user?.id) return false;

  const userData = api.users.getById.useQuery(
    {
      id: user?.id,
    },
    {
      enabled: !!user?.id,
    }
  );

  return userData?.data?.role === "ADMIN" || "MOD";
};
