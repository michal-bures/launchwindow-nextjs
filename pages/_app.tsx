import '../styles.css'
import React from 'react';
import Head from 'next/head';

export default function MyApp({Component, pageProps}) {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic@6.5.2/picnic.min.css"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Component {...pageProps} />
        </div>
    )
}
