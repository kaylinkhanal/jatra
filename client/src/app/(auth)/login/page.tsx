"use client";
import LoginForm from "@/components/form/auth/LoginForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";

const LoginPage = () => {
  const images = ["auth-1.jpg", "auth-2.jpg", "auth-3.jpg", "auth-4.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.set("#moving_img", {
      borderRadius: "2% 0% 0% 2%",
      x: "100%",
    });

    gsap.fromTo(
      "#moving_img",
      {
        x: "100%",
      },
      {
        x: "0%",
        duration: 2,
        ease: "power1.inOut",
      }
    );
  }, [currentImageIndex]);
  // bg-[#B4EBE6]
  return (
    <div className=" bg-black min-h-screen min-w-full flex justify-center items-center">
      <div className="min-h-[90vh] w-[80%] flex rounded-lg overflow-hidden shadow-black">
        <div className="h-[90vh] w-1/2 relative overflow-hidden">
          <img
            className="object-cover absolute w-full h-full"
            src={images[currentImageIndex]}
            alt={`auth-${currentImageIndex + 1}`}
          />
          <img
            id="moving_img"
            className="object-cover absolute w-full h-full"
            src={images[(currentImageIndex + 1) % images.length]} // Next image
            alt={`auth-${((currentImageIndex + 1) % images.length) + 1}`}
          />
        </div>
        <div className=" w-1/2 bg-gray-50">
          <div className=" w-full h-full mx-auto space-y-2  p-6 ">
            <div className="space-y-2 flex flex-col items-center">
              <Image src="/logojatra.png" alt="logo" width={100} height={100} />
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
