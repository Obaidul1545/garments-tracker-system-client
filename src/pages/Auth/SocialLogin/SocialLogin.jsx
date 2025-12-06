import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  return (
    <div className="">
      <button className="btn btn-outline w-full border-teal-600 flex items-center gap-2">
        <FcGoogle size={24} />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
