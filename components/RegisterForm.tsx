'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterForm as RegisterFormType, ApiErrorType } from '@/types/auth';
import { authService } from '@/services/api';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormType>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormType) => {
    if (data.password !== data.confirm_password) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setError('');
      await authService.register(data);
      onRegisterSuccess();
    } catch (err: unknown) {
      const apiError = err as ApiErrorType;
      setError(apiError.response?.data?.error || apiError.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro de Usuario
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                {...register('username', { required: 'El usuario es requerido' })}
                id="username"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                {...register('password', { required: 'La contraseña es requerida' })}
                id="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirm_password" className="sr-only">Confirmar Contraseña</label>
              <input
                {...register('confirm_password', {
                  required: 'Por favor confirma tu contraseña',
                  validate: value => value === password || 'Las contraseñas no coinciden'
                })}
                id="confirm_password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Contraseña"
              />
              {errors.confirm_password && (
                <p className="mt-2 text-sm text-red-600">{errors.confirm_password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 