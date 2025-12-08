import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SocialLogin = () => {
  const { logInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogIn = () => {
    logInGoogle()
      .then((result) => {
        // create user in the database
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: 'buyer',
        };

        axiosSecure.post('/users', userInfo).then(() => {
          toast.success('User sign in Success full!!');
          navigate(location.state || '/');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <button
        onClick={handleGoogleLogIn}
        state={location.state}
        className="btn btn-outline w-full border-teal-600 flex items-center gap-2"
      >
        <FcGoogle size={24} />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
