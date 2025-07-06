"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, ChevronUp, X } from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
// import Seo from "@/components/others/seo";

interface ParentModel {
  _id: string;
  modelName: string;
  image: string;
  parentBrand: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ParentBrand {
  _id: string;
  brandName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Car {
  _id: string;
  carName: string;
  image?: string;
  year?: string;
  status: string;
  parentModel: ParentModel;
  parentBrand: ParentBrand;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const pathName = usePathname();
  const brandId = pathName.split("/")[2];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/cars/car/all?modelId=${brandId}`
        );
        const data = await response.json();
        setCars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [brandId]);

  const toggleCarSelection = (car: Car) => {
    setSelectedCars((prev) =>
      prev.some((c) => c._id === car._id)
        ? prev.filter((c) => c._id !== car._id)
        : [...prev, car]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", { selectedCars, formData });
    alert("Booking request submitted!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* <Seo /> */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Available Cars</h1>
          {selectedCars.length > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View Booking ({selectedCars.length})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className={`border rounded-lg overflow-hidden shadow-md transition-all ${
                selectedCars.some((c) => c._id === car._id)
                  ? "ring-2 ring-blue-500"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="h-48 relative bg-gray-100">
                {car.image ? (
                  <Image
                    src={car.image}
                    alt={car.carName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                ) : car.parentModel?.image ? (
                  <Image
                    src={car.parentModel.image}
                    alt={car.parentModel.modelName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{car.carName}</h2>
                    <p className="text-gray-600 text-sm">
                      {car.parentBrand?.brandName} •{" "}
                      {car.parentModel?.modelName}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      car.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-gray-600">
                    {car.year || "Year not specified"}
                  </span>
                  <button
                    onClick={() => toggleCarSelection(car)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedCars.some((c) => c._id === car._id)
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {selectedCars.some((c) => c._id === car._id)
                      ? "Remove"
                      : "Select"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cart button */}
        {selectedCars.length > 0 && !isCartOpen && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg md:hidden flex items-center justify-center"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {selectedCars.length}
            </span>
          </button>
        )}

        {/* Booking sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0 md:shadow-none md:border-l md:pl-6`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            {selectedCars.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <ShoppingCart className="w-12 h-12 mb-4 text-gray-300" />
                <p>No cars selected</p>
                <p className="text-sm mt-2 text-center">
                  Select cars from the list to start your booking
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-3">
                    Selected Cars ({selectedCars.length})
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {selectedCars.map((car) => (
                      <li
                        key={car._id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-md border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{car.carName}</p>
                          <p className="text-sm text-gray-500">
                            {car.year || "Year not specified"} •{" "}
                            {car.parentModel?.modelName}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleCarSelection(car)}
                          className="ml-4 p-1 text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Remove car"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Booking Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      Your Information
                    </h3>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="123-456-7890"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed mt-4"
                      disabled={selectedCars.length === 0}
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarsPage;
