import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import HeadTitle from "@/components/HeadTitle/HeadTitle";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="h-screen">
        <HeadTitle />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
