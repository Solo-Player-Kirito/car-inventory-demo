"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
// import Seo from "@/components/others/seo";
// import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn/ui or similar

interface Brand {
  brandName: string;
  image: string;
  _id: string;
  createdAt: string;
}

const add_api = process.env.NEXT_PUBLIC_URL;

const ListBrand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pathName = usePathname();

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${add_api}/api/cars/brand/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch brands");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [pathName]);

  return (
    <>
      {/* <Seo /> */}
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Car Brands
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select from our wide range of premium automotive brands
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={fetchBrands}
                  className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <h1>Loading . . .</h1>
                {/* <Skeleton className="h-[150px] w-full rounded-lg" /> */}
                {/* <Skeleton className="h-4 w-3/4 mx-auto" /> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {brands.map((brand) => {
              if (!brand.brandName) return null;

              return (
                <Link
                  href={`/cars/model/${brand._id}`}
                  key={brand._id}
                  className="group"
                >
                  <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    <div className="aspect-square flex items-center justify-center p-6">
                      <Image
                        src={brand.image}
                        loading="lazy"
                        width={200}
                        height={200}
                        alt={`${brand.brandName} logo`}
                        className="max-h-[120px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <h3 className="text-center font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {brand.brandName}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ListBrand;
