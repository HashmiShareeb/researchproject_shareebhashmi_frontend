import axios from "axios";

const useAxios = () => {
  const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, //backend url
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

  const postData = async (endpoint: string, data: any) => {
    try {
      const response = await API.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };


  const putData = async (endpoint: string, data: any) => {
    try {
      const response = await API.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const deleteData = async (endpoint: string) => {
    try {
      const response = await API.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };

  

  return { getData, postData, putData, deleteData };
};

export default useAxios;
