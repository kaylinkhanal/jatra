import * as Yup from 'yup';

const LoginSchema = Yup.object({
    email: Yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup
              .string()
              .min(3, 'Password must be at least 3 characters long')
              .max(20, 'Password cannot be longer than 20 characters')
              .required('Password is required'),

})

export default LoginSchema;