"use client"
import Link from "next/link";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Oops!</h1>

        <h2 className="text-4xl font-semibold text-gray-700 mb-6">
          404 - PAGE NOT FOUND
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default Error;
