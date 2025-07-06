import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Homepage from "./pages/homepage";
import Head from "next/head";
// import Seo from "@/components/others/seo";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "MS Motors",
    url: "https://www.msmotors.com",
    logo: "https://www.msmotors.com/logo.png",
    image: "https://www.msmotors.com/showroom.jpg",
    description:
      "MS Motors offers new and used cars, best prices, top brands, and excellent customer service.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Car Street",
      addressLocality: "Jalandhar",
      addressRegion: "PB",
      postalCode: "144003",
      addressCountry: "IN",
    },
    telephone: "+91-1234567890",
    openingHours: "Mo-Sa 09:00-18:00",
  };

  return (
    <>
      {/* <Seo /> */}
      <Head>
        {/* Primary Meta Tags */}
        <title>MS Motors - New & Used Cars, Brands, Models, Pricing</title>
        <meta
          name="description"
          content="Discover the best car deals at MS Motors. We offer a wide range of new and used cars from top brands with competitive pricing and excellent service."
        />
        <meta
          name="keywords"
          content="cars, car dealership, buy cars, used cars, new cars, car models, auto brands, car pricing, MS Motors"
        />
        <meta name="author" content="MS Motors" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.MSMOTOS.com" />
        <meta
          property="og:title"
          content="MS Motors - New & Used Cars, Brands, Models, Pricing"
        />
        <meta
          property="og:description"
          content="Discover the best car deals at MS Motors. We offer a wide range of new and used cars from top brands with competitive pricing and excellent service."
        />
        <meta
          property="og:image"
          content="https://www.MSMOTORS.com/og-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MSMOTORS" />
        <meta
          name="twitter:title"
          content="MS Motors - New & Used Cars, Brands, Models, Pricing"
        />
        <meta
          name="twitter:description"
          content="Discover the best car deals at MS Motors. We offer a wide range of new and used cars from top brands with competitive pricing and excellent service."
        />
        <meta
          name="twitter:image"
          content="https://www.MSMOTORS.com/og-image.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.MSMOTORS.com/" />
      </Head>
      {/* <Seo /> */}
      <Header />
      <Homepage />
      <Footer />
    </>
  );
}
