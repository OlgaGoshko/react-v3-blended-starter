import axios from "axios";
import type { Photo } from "../types/photo";

// const API_KEY = "563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74";
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

interface ApiResponse {
  photos: Photo[];
}
export const getPhotos = async (query: string): Promise<Photo[]> => {
  const response = await axios.get<ApiResponse>(`search?query=${query}`);

  return response.data.photos;
};
