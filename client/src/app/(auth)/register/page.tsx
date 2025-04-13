"use client";
import RegisterForm from "@/components/form/auth/RegisterForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  return (
    <div className=" bg-black min-h-screen min-w-full flex justify-center items-center">
    <div className="min-h-[90vh] max-h-[90vh] w-[80%] flex rounded-lg overflow-hidden shadow-black">
      <div className="w-1/2 relative text-center text-white transition-transform bg-gradient-to-t from-blue-900/70 to-transparent flex items-center justify-center flex-grow">
        <img
          className="object-cover absolute w-full h-full"
          src="auth-3.jpg"
          alt="auth photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent z-10"></div>
        <div className="z-20">
          <div className=" mb-10 my-auto text-center text-4xl font-bold">
            <h1>Experience, Every Moment</h1>
          </div>
          <p className="mt-4 text-lg text-center">
            Join us to savor unforgettable moments.
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center px-10 space-y-2">
        <div className="space-y-2 flex flex-col items-center">
          <Image
            onClick={() => router.push("/")}
            className="cursor-pointer"
            src="/logojatra.png"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-bold text-center text-orange-600">
            Create an account
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            Create your account and get started.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  </div>
  );
};

export default RegisterPage;
