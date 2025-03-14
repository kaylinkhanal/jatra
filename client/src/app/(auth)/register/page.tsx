import RegisterForm from "@/components/form/auth/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[400px] w-full mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="space-y-3 flex flex-col items-center">
            <Image src="/logojatra.png" alt="logo" width={100} height={100}/>
            <h1 className="text-3xl font-bold text-center text-orange-600 dark:text-white">Create an account</h1>
            <p className="text-muted-foreground text-center text-sm">
              Enter your details below to create your account and get started.
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
  );
};

export default RegisterPage;