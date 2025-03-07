export interface IListing {
  _id: string;
  name: string;
  description: string;
  price: number;
  condition: "new" | "used";
  category:
    | "Electronics"
    | "Fashion"
    | "Home & Furniture"
    | "Books & Media"
    | "Device"
    | "Accessories";
  images: string[];
  inStock: boolean;
  quantity: number;
  userId: string | undefined;
  status: "available" | "sold";
}
