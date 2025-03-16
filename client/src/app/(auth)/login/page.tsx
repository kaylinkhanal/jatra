"use client";
import LoginForm from "@/components/form/auth/LoginForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  // bg-[#B4EBE6]
  return (
    <div className=" bg-black min-h-screen min-w-full flex justify-center items-center">
      <div className="min-h-[90vh] w-[80%] flex rounded-lg overflow-hidden shadow-black">
        <div className="h-[90vh] w-1/2 relative text-center text-white transition-transform overflow-hidden bg-gradient-to-t from-blue-900/70 to-transparent flex items-center justify-center">
          <img
            className="object-cover absolute w-full h-full"
            src="auth-3.jpg"
            alt="auth photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent z-10"></div>
          <div className="px-10 text-2xl 2xl:text-4xl font-semibold italic z-20">
            <p>"Where Your Next Adventure Begins!"</p>
          </div>
        </div>
        <div className=" w-1/2 bg-gray-50 ">
          <div className="w-full h-full flex flex-col justify-center space-y-2">
            <div className="space-y-2 flex flex-col items-center">
              <Image
                onClick={() => router.push("/")}
                className="cursor-pointer"
                src="/logojatra.png"
                alt="logo"
                width={100}
                height={100}
              />
              <h1 className="text-2xl font-bold text-orange-600 dark:text-white">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500">
                Login to your Jatra account.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
