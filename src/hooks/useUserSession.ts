import { useSession } from "next-auth/react";

export default function useUserSession() {
  const session = useSession();

  return session.status === "authenticated" ? session.data.user : null;
}
