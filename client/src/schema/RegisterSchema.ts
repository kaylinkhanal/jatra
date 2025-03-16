import * as Yup from "yup";

const RegisterSchema = Yup.object({
  fullName: Yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters and spaces")
    .required("Full name is required"),
  
  email: Yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  
  // phone: Yup
  //   .string()
  //   .min(10, "Phone number must be at least 10 digits")
  //   .max(15, "Phone number must be at most 15 digits")
  //   .matches(/^[0-9]*$/, "Phone number must contain only digits")
  //   .required("Phone number is required"),
  
    role: Yup.string()
    .oneOf(["user", "organizer", "artist"], "Invalid role")
    .required("Role is required"),
  
  
  password: Yup
          .string()
          .min(8, 'Password must be at least 8 characters long')
          .max(20, 'Password cannot be longer than 20 characters')
          .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
          .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .matches(/[0-9]/, 'Password must contain at least one number')
          .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
          .required('Password is required'),
  
});

export default RegisterSchema;