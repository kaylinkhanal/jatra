"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormik } from "formik";
import LoginSchema from "@/schema/LoginSchema";
import { useState } from "react";
import ForgetPasswordModel from "./ForgetPasswordModel";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()

  const handleLogin = async(values:any)=>{
    try{
      const res = await axios.post('http://localhost:9000/login', values)
      if(res.status == 200) {
       toast.success(res.data.msg)
       router.push('/dashboard')
      }
    }catch(err:any){
      toast.error(err.response?.data?.msg)
    }

   }
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      handleLogin(values)
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your Email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <div
              onClick={() => setIsForgetPasswordModelOpen(true)}
              className="ml-auto cursor-pointer text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </div>
          </div>
          <Input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter your Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Logging in..." : "Submit"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </form>
      <ForgetPasswordModel
        open={isForgetPasswordModelOpen}
        onOpenChange={setIsForgetPasswordModelOpen}
      />
    </>
  );
};

export default LoginForm;
