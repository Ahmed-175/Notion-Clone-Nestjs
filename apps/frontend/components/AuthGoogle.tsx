import Image from "next/image";
import Link from "next/link";
const AuthGoogle = () => {
  return (
    <Link
      href={"http://localhost:8000/auth/google"}
      className={`w-full p-3  hover:bg-gray-700 cursor-pointer
         rounded-lg text-white gap-4 mt-5  text-xl mb-6 duration-150 flex 
         justify-center items-center bg-black `}
    >
      Login with your google account
      <Image
        src="/icons/google-icon.png"
        alt="google-icon"
        width={25}
        height={25}
      />
    </Link>
  );
};

export default AuthGoogle;
