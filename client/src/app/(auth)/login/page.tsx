import LoginForm from "@/components/form/auth/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[400px] w-full mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-2 flex flex-col items-center">
          <Image src="/logojatra.png" alt="logo" width={100} height={100} />
          <h1 className="text-2xl font-bold text-orange-600 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Login to your Jatra account.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
