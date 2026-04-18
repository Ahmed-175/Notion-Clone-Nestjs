import Link from "next/link";
const Logo = () => {
  return (
    <Link
      href={"/home"}
      className=" fixed right-10 bottom-7  p-2 px-6  w-15 h-15 rounded-2xl bg-black flex justify-center
     items-center text-white text-4xl"
    >
      N
    </Link>
  );
};

export default Logo;
