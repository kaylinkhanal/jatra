"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormik } from "formik";
import RegisterSchema from "@/schema/RegisterSchema";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const handleRegister = async (values: any) => {
    try {
      const res = await axios.post("/api/auth/register", values);
      if (res.status == 200 || res.status == 201) {
        toast.success(res.data.msg);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg);
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4  px-8">
      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            placeholder="Enter your Full Name"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
          )}
        </div>
        <div className="grid gap-1 w-1/2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your Email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3 ">
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="border rounded-md p-2 w-full"
          >
            <option value="user">User</option>
            <option value="organizer">Organization</option>
            <option value="artist">Artist</option>
          </select>

          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
          )}
        </div>
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter your Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-500 cursor-pointer"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Creating account..." : "Submit"}
      </Button>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button variant="outline" className="w-full">
        Sign up with Google
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
