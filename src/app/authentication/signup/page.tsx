// pages/signup.tsx
"use client";

import React from 'react';
import AuthForm from '../authForm';
import { useRouter } from 'next/navigation';


const SignupPage: React.FC = () => {

  const router = useRouter(); // Get the router instance

  const handleSignup = (email: string, password: string, name?: string, photo?: File) => {
    // Your signup logic here, including handling name and photo
    console.log('Signing up:', email, password, name, photo);

    // Example: Convert the photo file to FormData for a POST request
    if (photo) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      if (name) formData.append('name', name);
      formData.append('photo', photo);

      // Send `formData` to your backend here
      router.push('/home')
    }
  };

  return (
    <div>
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
