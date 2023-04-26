import { useEffect } from "react";
import clsx from "clsx";
import Head from "next/head";

import { useAppDispatch } from "@hooks/index";

import { Header } from "@components/common/header";

import { useProfileSelector } from "@reducers/profile/useProfileSelector";
import { useProfileActions } from "@reducers/profile/useProfileActions";
import { getUserDataThunk } from "@reducers/profile/profile.thunk";

import styles from "./layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const siteTitle = "Tolistore";

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const { accessToken, isSetFromLocalStorage } = useProfileSelector();
  const { changeAccessToken } = useProfileActions();
  const dispatch = useAppDispatch();

  const layoutClassName = clsx(`${styles.layout}`);

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("accessToken");
    if (typeof token === "string") {
      changeAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (!isSetFromLocalStorage) return;
    if (!accessToken) return;

    dispatch(getUserDataThunk());
  }, [accessToken]);

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