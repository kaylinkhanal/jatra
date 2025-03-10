"use client";

import { useState } from "react";
import { useFormik } from "formik";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailSchema from "@/schema/EmailSchema";
import PasswordSchema from "@/schema/PasswordSchema";

interface ForgetPasswordModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "email" | "password";


const ForgetPasswordModel = ({ open, onOpenChange }: ForgetPasswordModelProps) => {
  const [step, setStep] = useState<Step>("email");

  const formikEmail = useFormik({
    initialValues: { email: "" },
    validationSchema: EmailSchema,
    onSubmit: (values) => {
      console.log("Email submitted:", values);
      setStep("password");
    },
  });

  const formikPassword = useFormik({
    initialValues: { password: "" },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      console.log("New password submitted:", values);
      onOpenChange(false);
      setStep("email");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "Enter your email to reset your password."
              : "Enter your new password."}
          </DialogDescription>
        </DialogHeader>
        {step === "email" ? (
          <form onSubmit={formikEmail.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formikEmail.handleChange}
                  onBlur={formikEmail.handleBlur}
                  value={formikEmail.values.email}
                />
                {formikEmail.touched.email && formikEmail.errors.email && (
                  <p className="text-red-500 text-sm">
                    {formikEmail.errors.email}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-orange-600!" type="submit">
                Next
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={formikPassword.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.password}
                />
                {formikPassword.touched.password &&
                  formikPassword.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formikPassword.errors.password}
                    </p>
                  )}
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-orange-600!" type="submit">
                Reset Password
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordModel;