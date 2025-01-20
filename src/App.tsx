import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from './lib/supabase';
import { ReservationList } from './components/ReservationList';
import { ReservationDialog } from './components/ReservationDialog';
import { Database } from './lib/database.types';

type Reservation = Database['public']['Tables']['reservations']['Row'] & {
  visitor: Database['public']['Tables']['visitors']['Row'];
  operation: Database['public']['Tables']['operations']['Row'];
};

type Operation = Database['public']['Tables']['operations']['Row'];
type Visitor = Database['public']['Tables']['visitors']['Row'];

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>();
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchReservations();
    fetchOperations();
    fetchVisitors();
  }, []);

  async function fetchReservations() {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        visitor:visitors(*),
        operation:operations(*)
      `)
      .order('start_at');

    if (error) {
      console.error('Error fetching reservations:', error);
      return;
    }

    setReservations(data);
  }

  async function fetchOperations() {
    const { data, error } = await supabase
      .from('operations')
      .select('*');

    if (error) {
      console.error('Error fetching operations:', error);
      return;
    }

    setOperations(data);
  }

  async function fetchVisitors() {
    const { data, error } = await supabase
      .from('visitors')
      .select('*');

    if (error) {
      console.error('Error fetching visitors:', error);
      return;
    }

    setVisitors(data);
  }

  function handleCreateClick() {
    setSelectedReservation(undefined);
    setDialogMode('create');
    setIsDialogOpen(true);
  }

  function handleReservationClick(reservation: Reservation) {
    setSelectedReservation(reservation);
    setDialogMode('edit');
    setIsDialogOpen(true);
  }

  async function handleDialogSubmit(data: any) {
    if (dialogMode === 'create') {
      const { error } = await supabase
        .from('reservations')
        .insert([
          {
            id: `reservation_${Date.now()}`,
            ...data,
          },
        ]);

      if (error) {
        console.error('Error creating reservation:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('reservations')
        .update(data)
        .eq('id', selectedReservation!.id);

      if (error) {
        console.error('Error updating reservation:', error);
        return;
      }
    }

    setIsDialogOpen(false);
    fetchReservations();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">予約一覧</h1>
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              新規作成
            </button>
          </div>
          <div className="bg-white shadow rounded-lg">
            <ReservationList
              reservations={reservations}
              onReservationClick={handleReservationClick}
            />
          </div>
        </div>
      </div>
      <ReservationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        reservation={selectedReservation}
        operations={operations}
        visitors={visitors}
        mode={dialogMode}
      />
    </div>
  );
}

export default App;