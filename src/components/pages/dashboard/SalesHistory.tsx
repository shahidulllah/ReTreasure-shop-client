"use client";

import Image from "next/image";

const SalesHistory = () => {
  const salesData = [
    {
      id: 1,
      title: "MacBook Pro 2021",
      price: "120,000৳",
      buyer: "John Doe",
      status: "Completed",
      date: "2025-03-15",
      image: "/laptop.jpg",
    },
    {
      id: 2,
      title: "iPhone 13 Pro Max",
      price: "90,000৳",
      buyer: "Jane Smith",
      status: "Pending",
      date: "2025-03-14",
      image: "/iphone.jpg",
    },
    {
      id: 3,
      title: "Sony Headphones",
      price: "12,500৳",
      buyer: "Michael Johnson",
      status: "Shipped",
      date: "2025-03-12",
      image: "/headphones.jpg",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
        Sales History
      </h1>
      <div className="mt-4 space-y-4">
        {salesData.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 space-x-4"
          >
            <Image
              src={sale.image}
              alt={sale.title}
              width={80}
              height={80}
              className="rounded-md object-cover border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{sale.title}</h2>
              <p className="text-gray-500 text-sm">Buyer: {sale.buyer}</p>
              <p className="text-gray-600 font-semibold">{sale.price}</p>
            </div>
            <div className="text-right">
              <p
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  sale.status === "Completed"
                    ? "bg-green-200 text-green-700"
                    : sale.status === "Pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-blue-200 text-blue-700"
                }`}
              >
                {sale.status}
              </p>
              <p className="text-xs text-gray-500 mt-1">{sale.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
