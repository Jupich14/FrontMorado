'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Implementar la lógica de login con Google
      console.log('Google login clicked');
    } catch (error) {
      console.error('Error en login con Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      // Implementar la lógica de login con Apple
      console.log('Apple login clicked');
    } catch (error) {
      console.error('Error en login con Apple:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">PlanPlan</h1>
          <p className="mt-2 text-sm text-gray-600 font-bold">Organiza tus actividades</p>
          <p className="text-xs text-gray-500 font-bold">Simple y efectivo</p>
        </div>

        <div className="mt-8 space-y-4">
          <Link 
            href="/register"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Crear cuenta
          </Link>

          <Link
            href="/login"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Ya tengo cuenta
          </Link>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            Continuar con Google
          </button>

          <button
            onClick={handleAppleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <img src="/apple.svg" alt="Apple" className="h-5 w-5 mr-2" />
            Continuar con Apple
          </button>

          <p className="text-xs text-center text-gray-500">
            Al continuar, aceptas nuestros{' '}
            <Link href="/terms" className="text-black hover:underline">Términos de Servicio</Link>
            {' '}y{' '}
            <Link href="/privacy" className="text-black hover:underline">Política de Privacidad</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
