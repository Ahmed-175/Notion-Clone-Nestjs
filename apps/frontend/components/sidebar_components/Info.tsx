"use client";

import useAuth from "@/hooks/useAuth";
import Picture from "@/ui/Picture";

const Info = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-2 items-center">
      <Picture endpoint={user?.picture} username={user?.username as any} />
      <div>
        <div className="">{user?.username}</div>
        <div className="text-xs text-gray-800">{user?.email}</div>
      </div>
    </div>
  );
};

export default Info;
