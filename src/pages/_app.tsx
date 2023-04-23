import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="bg-slate-900 text-center text-slate-200">
      <header>
        <h1>Behind the Bar</h1>
        <span className="min-w-3 ps-6.5 mx-auto flex max-w-xl justify-between gap-2 rounded-full bg-slate-600 py-2 pe-2 ps-5 text-lg font-thin">
          <input
            type="text"
            placeholder="Search Drinks"
            className="flex-1 bg-transparent"
          />
          <button className="aspect-square w-10 rounded-full bg-slate-400 p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </svg>
          </button>
        </span>
      </header>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
