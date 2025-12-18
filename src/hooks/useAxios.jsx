import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://garments-tracker-system-server.vercel.app',
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
