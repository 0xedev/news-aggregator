import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = 'NewsHub - Latest Breaking News' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Get the latest breaking news updates from around the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 pb-8">{children}</main>
        <Footer />
      </div>
    </>
  );
}