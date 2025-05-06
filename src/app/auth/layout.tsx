"use client";
import { useEffect } from "react";
import { useAuth } from "./login/hooks/useAuth";
import { useRouter } from "next/navigation";

type LayoutProps = {
    children: React.ReactNode,
  };

const Layout = ({children}: LayoutProps) => {

  const router = useRouter();

  const {isLoggedIn} = useAuth()
  useEffect(() => {
    if(isLoggedIn){
      router.push('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen grid grid-cols-3">
      <div className="col-span-2 bg-red-500">img</div>
      <div className="flex items-center justify-center">
        <div className="w-[70%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
