import React from 'react';
import { format } from 'date-fns';
import { Database } from '../lib/database.types';

type Reservation = Database['public']['Tables']['reservations']['Row'] & {
  visitor: Database['public']['Tables']['visitors']['Row'];
  operation: Database['public']['Tables']['operations']['Row'];
};

interface ReservationListProps {
  reservations: Reservation[];
  onReservationClick: (reservation: Reservation) => void;
}

export function ReservationList({ reservations, onReservationClick }: ReservationListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              来院者名
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              予約時間
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              施術名
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr
              key={reservation.id}
              onClick={() => onReservationClick(reservation)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {reservation.visitor.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(reservation.start_at), 'yyyy/MM/dd HH:mm')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {reservation.operation.name}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}