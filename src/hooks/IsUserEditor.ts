import { api } from "@/utils/api";
import useUserSession from "./useUserSession";

export const IsUserEditor = () => {
  const user = useUserSession();

  const userData = api.users.getById.useQuery(
    {
      id: user?.id ? user.id : "",
    },
    {
      enabled: !!user?.id,
    }
  );

  return userData?.data?.role === "ADMIN" || userData?.data?.role === "MOD";
};
