import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSellerDetails = async (sellerId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
