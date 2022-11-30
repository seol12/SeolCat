import React from 'react';
import Head from 'next/head';


const SEO = ({ title, description, ogTitle, ogDescription, ogUrl, ogImage }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="title" key="title" content={`${title}`} />
        <meta name="description" key="description" content={`${description}`} />
        <meta property="og:title" key="ogTitle" content={`${ogTitle}`} />
        <meta property="og:description" key="ogDescription" content={`${ogDescription}`} />
        <meta property="og:url" key="ogUrl" content={`${ogUrl}`} />
        <meta property="og:image" key="ogImage" content={`${ogImage || 'http://www.seolcat.com/default_og_image.png'}`} />
      </Head>
    </>
  );
  
};


export default SEO;