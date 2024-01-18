import Layout from "@/components/Layout/Layout";
import store from "@/redux/app/store";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isUserLogin, setIsUserLogin] = useState("");

  useEffect(() => {
    setIsUserLogin(localStorage.getItem("e-commerce_userId"));
    if (isUserLogin) {
      router.push("/")
    }
  }, [isUserLogin]);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
