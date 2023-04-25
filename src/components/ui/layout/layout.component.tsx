import Head from "next/head";
import styles from "./layout.module.scss";
import { Header } from "@UI/header";
import { useAuthActions } from "@reducers/auth/useAuthActions";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const siteTitle = "Tolistore";

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const { changeAccessToken } = useAuthActions();

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("accessToken");
    if (typeof token === "string") {
      changeAccessToken(token);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
};

LayoutComponent.displayName = "Layout";
