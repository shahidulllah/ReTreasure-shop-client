import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`;

interface User {
  name: string;
  email: string;
  phone: string;
  token: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  user?: User;
}

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed");
  }
};

