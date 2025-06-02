'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ReportForm as ReportFormType, ApiErrorType } from '@/types/auth';
import { authService } from '@/services/api';

export default function ReportForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormType>();

  const onSubmit = async (data: ReportFormType) => {
    try {
      setError('');
      setSuccess('');
      const response = await authService.report(data.problem);
      setSuccess(response.message || 'Reporte enviado exitosamente');
      reset();
    } catch (err: unknown) {
      const apiError = err as ApiErrorType;
      setError(apiError.response?.data?.error || apiError.message || 'Error al enviar el reporte');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Reportar un Problema</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción del Problema
        </label>
        <textarea
          {...register('problem', { 
            required: 'Por favor describe el problema',
            minLength: {
              value: 10,
              message: 'La descripción debe tener al menos 10 caracteres'
            }
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe el problema que has encontrado..."
        />
        {errors.problem && (
          <p className="mt-1 text-sm text-red-600">{errors.problem.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {success && (
        <p className="text-sm text-green-600">{success}</p>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Enviar Reporte
      </button>
    </form>
  );
} 