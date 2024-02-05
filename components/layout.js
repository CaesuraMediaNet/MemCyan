import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/memcyan.module.css';
import Link from 'next/link';
import Script from 'next/script';
import { Lemon } from 'next/font/google';
const memCyanFont = Lemon({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const name = 'MemCyan';
export const siteTitle = 'MemCyan : A fast Tyle Click and Memory Game';

export default function Layout({ children, home }) {
  return (
    <div className={[styles.container, memCyanFont.className].join (' ')}>
      <Head>
      <meta charSet="utf-8" />
      <meta name="format-detection"      content="telephone=yes" />
      <meta name="format-detection"      content="date=yes" />
      <meta name="format-detection"      content="address=yes" />
      <meta name="format-detection"      content="email=no" />
      <meta name="theme-color"           content="#f1fdf4" />
      <meta name="description"           content="MemCyan Game : Fast paced memory game!" />
      <meta name="keywords"              content="Memory, Game, Tyles, Cyan, Caesura" />
      <meta name="author"                content="Caesura Media Limited" />
      <meta name="viewport"              content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="X-UA-Compatible"  content="IE=edge,chrome=1" />

      <title>MemCyan : A fast memory game</title>

      <link rel="apple-touch-icon"       href="/img/memcyan-logo.png" sizes="180x180" />
      <link rel="icon"                   href="/img/memcyan-logo.png" sizes="32x32" type="image/png" />
      <link rel="icon"                   href="/img/memcyan-logo.png" sizes="16x16" type="image/png" />
      <link rel="mask-icon"              href="/img/memcyan-logo.png" color="#563d7c" />
      <link rel="icon"                   href="/img/memcyan-logo.png" />

      <meta name="twitter:card"         content="summary" />
      <meta name="twitter:site"         content="@andykjcragg" />
      <meta name="twitter:creator"      content="@andykjcragg" />
      <meta name="twitter:title"        content="MemCyan" />
      <meta name="twitter:description"  content="MemCyan Game : Fast paced memory game!" />
      <meta name="twitter:image"        content="https://memcyan.vercel.app/img/memcyan-logo.png" />

      <meta property="og:url"              content="https://memcyan.vercel.app/" />
      <meta property="og:title"            content="MemCyan" />
      <meta property="og:description"      content="MemCyan Game : Fast paced memory game!" />
      <meta property="og:type"             content="website" />
      <meta property="og:image"            content="https://memcyan.vercel.app/img/memcyan-logo.png" />
      <meta property="og:image:secure_url" content="https://memcyan.vercel.app/img/memcyan-logo.png" />
      <meta property="og:image:type"       content="image/png" />
      <meta property="og:image:width"      content="50" />
      <meta property="og:image:height"     content="50" />
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1254785829011101" />
      </Head>
      <header className={styles.header}>
      </header>
      <main>{children}</main>
    </div>
  );
}
