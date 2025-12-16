import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { user, logOutUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      // interceptior response
      const resInterceptor = axiosSecure.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log(error);

          const statusCode = error.response?.status;
          if (statusCode === 401 || statusCode === 403) {
            logOutUser().then(() => {
              navigate('/auth/login');
            });
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
      };
    }
  }, [user, navigate, logOutUser, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
