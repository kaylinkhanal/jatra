"use client";
import RegisterForm from "@/components/form/auth/RegisterForm";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

const RegisterPage = () => {
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
          <div className="w-full h-full mx-auto space-y-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-2 flex flex-col items-center">
              <Image src="/logojatra.png" alt="logo" width={100} height={100} />
              <h1 className="text-2xl font-bold text-center text-orange-600">Create an account</h1>
              <p className="text-muted-foreground text-center text-sm">
                Create your account and get started.
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
