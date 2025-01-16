import axios from "axios";

const useAxios = () => {
  const API = axios.create({
    baseURL: "http://localhost:8080/api", // Ensure this is correct
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getData = async (endpoint: string) => {
    try {
      const response = await API.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return { getData };
};

export default useAxios;
