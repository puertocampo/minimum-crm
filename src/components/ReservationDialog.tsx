import React from 'react';
import { useForm } from 'react-hook-form';
import { Database } from '../lib/database.types';
import { X } from 'lucide-react';

type Reservation = Database['public']['Tables']['reservations']['Row'] & {
  visitor: Database['public']['Tables']['visitors']['Row'];
  operation: Database['public']['Tables']['operations']['Row'];
};

type Operation = Database['public']['Tables']['operations']['Row'];
type Visitor = Database['public']['Tables']['visitors']['Row'];

interface ReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  reservation?: Reservation;
  operations: Operation[];
  visitors: Visitor[];
  mode: 'create' | 'edit';
}

export function ReservationDialog({
  isOpen,
  onClose,
  onSubmit,
  reservation,
  operations,
  visitors,
  mode,
}: ReservationDialogProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: reservation
      ? {
          visitor_id: reservation.visitor_id,
          operation_id: reservation.operation_id,
          start_at: reservation.start_at.split('.')[0],
          end_at: reservation.end_at.split('.')[0],
        }
      : undefined,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === 'create' ? '新規予約作成' : '予約詳細'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">来院者</label>
            <select
              {...register('visitor_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {visitors.map((visitor) => (
                <option key={visitor.id} value={visitor.id}>
                  {visitor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">施術</label>
            <select
              {...register('operation_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {operations.map((operation) => (
                <option key={operation.id} value={operation.id}>
                  {operation.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">開始時間</label>
            <input
              type="datetime-local"
              {...register('start_at')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">終了時間</label>
            <input
              type="datetime-local"
              {...register('end_at')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {mode === 'create' ? '作成' : '更新'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}