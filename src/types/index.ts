export interface IListing {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  location: string;
  category: string;
  image: string;
  sellerId: string | undefined;
  createdAt: string;
}

export interface IUser {
_id: string;
name: string;
image: string;
email:string;
phone:string;
role: string;
}

export interface FetchListingsParams {
  skip?: number;
  limit?: number;
  filterOptions?: string;
}

export interface AddListingArgs {
  data: Partial<IListing>;
  token: string;
}

export interface EditListingArgs {
  id: string;
  data: Partial<IListing>;
  token: string;
}

export interface RemoveListingArgs {
  id: string;
  token: string;
}
