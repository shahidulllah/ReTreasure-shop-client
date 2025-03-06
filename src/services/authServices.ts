import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`;

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  if (response.data.success) {
    const userData = response.data.user;
    Cookies.set("token", userData.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  }
  return response.data;
};

// Logout User
export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};
