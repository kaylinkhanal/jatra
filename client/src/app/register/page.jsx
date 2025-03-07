'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  address: Yup.string().max(200, 'Too Long!'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(7, 'Too Short!').max(15, 'Too Long!'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  dateOfBirth: Yup.date().nullable(),
  gender: Yup.string().oneOf(['male', 'female', 'other', 'prefer not to say']),
});

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const handleRegister = async (values)=>{
    try{
      setLoading(true)
      const {data} = await axios.post(`http://localhost:9000/register`,values)
      if(data){
       setLoading(false)
       alert(data.msg)}
    }catch(err){
      setLoading(false)
      alert(err.message)
    }
  }


  return(
  <div className='bg-amber-200 m-4 flex flex-col'>
    <h1>Register</h1>
    <Formik
      initialValues={{
        fullName: '',
        address: '',
        email: '',
        phoneNumber: '',
        password: '',
        dateOfBirth: null,
        gender: 'prefer not to say',
        interests: [],
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        bio: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleRegister(values)
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <label htmlFor="fullName">Full Name</label>
          <Field name="fullName" />
          {errors.fullName && touched.fullName ? <div>{errors.fullName}</div> : null}

          <label htmlFor="address">Address</label>
          <Field name="address" />
          {errors.address && touched.address ? <div>{errors.address}</div> : null}

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <label htmlFor="phoneNumber">Phone Number</label>
          <Field name="phoneNumber" />
          {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <Field name="dateOfBirth" type="date" />
          {errors.dateOfBirth && touched.dateOfBirth ? <div>{errors.dateOfBirth}</div> : null}

          <label htmlFor="gender">Gender</label>
          <Field as="select" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer not to say</option>
          </Field>
          {errors.gender && touched.gender ? <div>{errors.gender}</div> : null}

 

          <button type="submit">{loading ? '...': 'Submit'}</button>
        </Form>
      )}
    </Formik>
  </div>
)};


export default Register
