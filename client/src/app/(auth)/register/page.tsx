'use client'
import { Background } from "@/components/background";
import RegisterForm from "@/components/form/auth/RegisterForm";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { OrbitControls } from '@react-three/drei';

const RegisterPage = () => {
  return (
    <div className="relative w-full h-[130vh] bg-black">
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
        <div className="max-w-[400px] w-full min-w-[350px] mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
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
