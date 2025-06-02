'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import type { RegisterForm } from '@/types/auth';
import { authService } from '@/services/api';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirm_password) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await authService.register(data);
      if (response.user) {
        router.push('/login');
      }
    } catch (err) {
      setError('Error al crear la cuenta. El email podría estar ya registrado.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">PlanPlan</h1>
          <p className="mt-2 text-sm text-gray-600">Crear cuenta</p>
          <p className="text-sm text-gray-600">Ingresa tu correo para iniciar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <input
              {...register('username')}
              type="email"
              placeholder="email@domain.com"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Contraseña"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <input
              {...register('confirm_password')}
              type="password"
              placeholder="Confirmar Contraseña"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none"
          >
            Continuar
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            Continuar con Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <img src="/apple.svg" alt="Apple" className="h-5 w-5 mr-2" />
            Continuar con Apple
          </button>

          <p className="text-xs text-center text-gray-500">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="text-black hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-black hover:underline">Privacy Policy</Link>
          </p>
        </form>
      </div>
    </main>
  );
} 