"use client";

import React from 'react';
import { ViewState } from '@/types';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { RegisterContainer } from '@/components/auth/register/RegisterContainer';

interface AuthProps {
   setView: (view: ViewState) => void;
   mode: 'login' | 'register';
}

export const Auth: React.FC<AuthProps> = ({ setView, mode }) => {
   if (mode === 'login') {
      return <LoginForm setView={setView} />;
   }

   return <RegisterContainer setView={setView} />;
};