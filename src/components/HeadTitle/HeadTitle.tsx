import Head from "next/head";
import React from "react";

export default function HeadTitle() {
  return (
    <Head>
      <title>SDC!</title>
      <meta name="description" content="We are software Developers" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
