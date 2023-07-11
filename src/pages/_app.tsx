import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

import { Header } from "../components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Behind the Bar</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative mx-auto min-h-screen max-w-screen-2xl bg-slate-900 px-2 py-4 text-center text-slate-200">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
