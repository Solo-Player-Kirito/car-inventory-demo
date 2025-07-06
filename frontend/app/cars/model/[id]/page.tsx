"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
// import Seo from "@/components/others/seo";

interface Model {
  modelName: string;
  image?: string;
  parentBrand: string;
  _id: string;
  createdAt: string;
  categoryId?: string;
}

const add_api = process.env.NEXT_PUBLIC_URL;

const ListModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [categoryId, setCategoryId] = useState<string>("");

  const pathName = usePathname();
  const brandId = pathName.split("/")[3];

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${add_api}/api/cars/model/all?brandId=${brandId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setModels(data);
      setFilteredModels(data);

      // if (data.length > 0 && data[0].categoryId) {
      //   setCategoryId(data[0].categoryId);
      // }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch models");
      console.error("Error fetching models:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [pathName]);

  useEffect(() => {
    const results = models.filter((model) =>
      model.modelName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModels(results);
  }, [searchQuery, models]);

  return (
    <>
      {/* <Seo /> */}
      <Header />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Select Your Model
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose from our extensive collection of vehicle models
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex items-center">
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
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
                <button
                  onClick={fetchModels}
                  className="mt-2 text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <h1>Loading . . .</h1>
              </div>
            ))}
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No models found
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "No models match your search criteria"
                : "There are currently no models available for this brand"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredModels.map((model) => (
              <Link
                href={`/cars/mycar/${model._id}`}
                key={model._id}
                className="group"
              >
                <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="aspect-square bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center p-4">
                    {model.image ? (
                      <Image
                        src={model.image}
                        loading="lazy"
                        width={200}
                        height={200}
                        alt={`${model.modelName} image`}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-center font-medium text-gray-900 dark:text-white line-clamp-1">
                      {model.modelName}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />{" "}
    </>
  );
};

export default ListModels;
