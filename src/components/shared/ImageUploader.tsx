"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("");
  console.log("imageUrl:", imageUrl);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log("formData:", formData);
    console.log("file:", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />

      {imageUrl && (
        <Image src={imageUrl} alt="uploaded" className="mt-4 w-40 h-auto" />
      )}
    </div>
  );
}
