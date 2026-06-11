import Link from "next/link";
import usePresence from "../hooks/usePresence";
import Picture from "@/ui/Picture";
import UserPicture from "@/ui/UserPicture";

const ActiveUsersList = () => {
  const { activeUsers } = usePresence()
  return (
    <div
      className="
        absolute left-20 bottom-1 h-70 w-70 overflow-y-auto p-2 bg-slate-100
         rounded-xl
        shadow
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible

        transition-opacity duration-200
      "
    >
      <h1>Active Users</h1>
      <hr className=" text-slate-300 my-2" />

      {activeUsers.map((user, index) => (
        <Link href={"/home"} key={index} className="flex gap-2 items-center mb-2 cursor-pointer">
          <div>
            <UserPicture url={user.picture} username={user.username} size="sm" />
          </div>
          <div>
            <div className="">
              {user.username}
            </div>
            <div className=" text-slate-700 text-sm">
              {user.email}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ActiveUsersList;