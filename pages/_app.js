import DashLayout from "../components/DashLayout";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { UserContextProvider } from "../UserContext";

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith("/dashboard")) {
    return (
      <UserContextProvider>
        <DashLayout>
          <Component {...pageProps} />
        </DashLayout>
      </UserContextProvider>
    );
  }
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}

export default MyApp;
