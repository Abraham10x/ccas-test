/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { ModalProvider } from "@features/context/modalContext";
// import authQueries from "@lib/queries/auth";
import { retrieveToken } from "@lib/helper";
import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [inactive, setInactive] = useState(false);
  const router = useRouter();
  // const { mutate } = authQueries.logout();
  const sessionID = retrieveToken("sessionID");

  const handleLogout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signout.php`;
    await axios.post(url, { session_id: sessionID });
    localStorage.clear();
    await router.push("/login", "/login", { shallow: true });
    // const id = 1
    // toast.success("Logged out successfully! 🎉", id);
    // mutate({ session_id: sessionID });
  };

  useEffect(() => {
    import("preline");
  }, []);

  useEffect(() => {
    let inactivityTimer = setTimeout(() => {
      setInactive(true);
    }, 900000); // 5 minutes

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setInactive(true);
      }, 900000); // 5 minutes
    }

    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);

    return () => {
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  if (inactive) {
    // alert('You are inactive, system is logging you out!');
    handleLogout();
    setInactive(false);
    alert("Because you were inactive, system will automatically log you out!");
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Hydrate state={pageProps.dehydratedState}>
        <ModalProvider>
          <Component {...pageProps} />
          <div>
            <TawkMessengerReact
              propertyId="643537cf31ebfa0fe7f7a427"
              widgetId="1gtnu415d"
            />
          </div>
        </ModalProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
