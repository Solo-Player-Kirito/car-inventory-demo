// // components/Seo.tsx

// import { NextSeo, LogoJsonLd } from "next-seo";
// import Head from "next/head";

// type SeoProps = {
//   title?: string;
//   description?: string;
//   url?: string;
//   image?: string;
// };

// export default function Seo({
//   title = "MS Motors - New & Used Cars in India | Brands, Models, Pricing",
//   description = "MS Motors offers a wide range of new and used cars in India from top brands with competitive pricing and excellent customer service.",
//   url = "https://www.msmotors.in/",
//   image = "https://www.msmotors.in/og-image.jpg",
// }: SeoProps) {
//   return (
//     <>
//       <Head>
//         <meta
//           name="keywords"
//           content="cars, buy cars, new cars, used cars, brands, pricing, India, MS Motors"
//         />
//         <meta name="author" content="MS Motors" />
//         <meta name="robots" content="index, follow" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="canonical" href={url} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <NextSeo
//         title={title}
//         description={description}
//         canonical={url}
//         openGraph={{
//           type: "website",
//           locale: "en_IN",
//           url,
//           title,
//           description,
//           images: [
//             {
//               url: image,
//               width: 1200,
//               height: 630,
//               alt: "MS Motors Showroom",
//             },
//           ],
//           site_name: "MS Motors",
//         }}
//         twitter={{
//           handle: "@msmotorsindia",
//           site: "@msmotorsindia",
//           cardType: "summary_large_image",
//         }}
//       />

//       <LogoJsonLd
//         logo="https://www.msmotors.in/logo.png"
//         url="https://www.msmotors.in/"
//       />

//       {/* Organization JSON-LD (OK to keep) */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "AutoDealer",
//             name: "MS Motors",
//             url: "https://www.msmotors.in/",
//             logo: "https://www.msmotors.in/logo.png",
//             image: "https://www.msmotors.in/showroom.jpg",
//             description:
//               "MS Motors offers a wide range of new and used cars in India from top brands with competitive pricing and excellent customer service.",
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: "123 Auto Street",
//               addressLocality: "Mumbai",
//               addressRegion: "MH",
//               postalCode: "400001",
//               addressCountry: "IN",
//             },
//             telephone: "+91-9876543210",
//             openingHours: "Mo-Sa 09:00-18:00",
//           }),
//         }}
//       />
//     </>
//   );
// }
