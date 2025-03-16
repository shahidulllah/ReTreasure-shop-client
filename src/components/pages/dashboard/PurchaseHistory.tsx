"use client";

import Image from "next/image";

const PurchaseHistory = () => {
  const purchaseData = [
    {
      id: 1,
      title: "Gaming Laptop",
      price: "150,000৳",
      seller: "Alice Johnson",
      status: "Delivered",
      date: "2025-03-15",
      image: "/gaming-laptop.jpg",
    },
    {
      id: 2,
      title: "Wireless Keyboard",
      price: "5,500৳",
      seller: "David Brown",
      status: "Pending",
      date: "2025-03-14",
      image: "/keyboard.jpg",
    },
    {
      id: 3,
      title: "Samsung Galaxy S23",
      price: "110,000৳",
      seller: "Chris Lee",
      status: "Shipped",
      date: "2025-03-12",
      image: "/samsung.jpg",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Purchase History</h1>
      <div className="mt-4 space-y-4">
        {purchaseData.map((purchase) => (
          <div
            key={purchase.id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 space-x-4"
          >
            <Image
              src={purchase.image}
              alt={purchase.title}
              width={80}
              height={80}
              className="rounded-md object-cover border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{purchase.title}</h2>
              <p className="text-gray-500 text-sm">Seller: {purchase.seller}</p>
              <p className="text-gray-600 font-semibold">{purchase.price}</p>
            </div>
            <div className="text-right">
              <p
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  purchase.status === "Delivered"
                    ? "bg-green-200 text-green-700"
                    : purchase.status === "Pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-blue-200 text-blue-700"
                }`}
              >
                {purchase.status}
              </p>
              <p className="text-xs text-gray-500 mt-1">{purchase.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
