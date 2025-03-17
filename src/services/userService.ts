/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSellerDetails = async (sellerId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${sellerId}`);

    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfile = async ({ userId, data }: any) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/users/profile/${userId}`,
      data
    );

    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
