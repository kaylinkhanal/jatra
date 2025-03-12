'use client'
import { Background } from "@/components/background";
import LoginForm from "@/components/form/auth/LoginForm";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Background />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas> 
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2  z-10 flex flex-col items-center justify-center px-4 py-2 dark:bg-gray-900">
      <Image src="/logojatra.png" alt="logo" width={100} height={100} />
      <div className="max-w-[400px] min-w-[350px] w-full mx-auto space-y-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Login to your Jatra account.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
