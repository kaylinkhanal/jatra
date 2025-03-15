import RegisterForm from "@/components/form/auth/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className=" bg-black min-h-screen min-w-full flex justify-center items-center">
      <div className="min-h-[90vh] w-[80%] flex rounded-lg overflow-hidden shadow-black">
      <div className="h-[90vh] w-1/2 relative overflow-hidden group">
          <img
            className="object-cover absolute w-full h-full"
            src="auth-4.jpg"
            alt="auth photo"
          />
          <div className="absolute w-full h-full bg-gradient-to-t from-blue-900/70 to-transparent text-white p-4 transition-transform transform translate-y-full group-hover:translate-y-0"
            style={{ transitionDuration: '1.5s' }}>
            <div className=" mb-10 mt-50 text-center text-4xl font-bold">
              <h1 >Experience, Every Moment</h1>
            </div>
            <p className="mt-4 text-lg text-center">
              Join us to savor unforgettable moments.
            </p>
          </div>
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
