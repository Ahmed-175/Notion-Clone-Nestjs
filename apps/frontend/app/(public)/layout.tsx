"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [user, loading]);

  if (loading)
    return (
      <div className="w-screen  h-screen flex justify-center items-center text-5xl">
        Loading...
      </div>
    );

  if (user) return null;

  return <>{children}</>;
};

export default PublicLayout;
