import { useEffect } from "react";
import Head from "next/head";

import styles from "./layout.module.scss";

import { Header } from "@UI/header";
import { useAuthActions } from "@reducers/auth/useAuthActions";
import clsx from "clsx";

type LayoutProps = {
  children: React.ReactNode;
};

const siteTitle = "Tolistore";

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const { changeAccessToken } = useAuthActions();

  const layoutClassName = clsx(`${styles.layout}`);

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("accessToken");
    if (typeof token === "string") {
      changeAccessToken(token);
    }
  }, []);

  return (
    <div className={layoutClassName}>
      <Head>
        <title>{siteTitle}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='px-20 pt-5'>{children}</main>
    </div>
  );
};

LayoutComponent.displayName = "Layout";