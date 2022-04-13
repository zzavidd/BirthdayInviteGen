import type { AppProps } from 'next/app';

import Head from 'next/head';
import React, { ReactElement } from 'react';

import 'styles/App.scss';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Ziventi</title>
        <meta name={'description'} content={'Generated by create next app'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
