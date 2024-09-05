"use client";

import React from 'react';
import AuthForm from '../authForm';

const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Your login logic here
    console.log('Logging in:', email, password);
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;