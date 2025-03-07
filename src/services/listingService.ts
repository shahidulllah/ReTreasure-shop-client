/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Get Listings (with search, filter, pagination)
export const getListings = async (params: any) => {
  try {
    const response = await axios.get(`${API_URL}/api/listings`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Listing
export const createListing = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/listings`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Listing
export const updateListing = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.patch(`${API_URL}/api/listings/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Listing
export const deleteListing = async (id: string, token: string) => {
  try {
    await axios.delete(`${API_URL}/api/listings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};
