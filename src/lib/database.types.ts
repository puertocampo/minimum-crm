export interface Database {
  public: {
    Tables: {
      visitors: {
        Row: {
          id: string;
          name: string;
          birthday: string;
        };
        Insert: {
          id: string;
          name: string;
          birthday: string;
        };
        Update: {
          id?: string;
          name?: string;
          birthday?: string;
        };
      };
      operations: {
        Row: {
          id: string;
          name: string;
          time_minutes: number;
          price: number;
        };
        Insert: {
          id: string;
          name: string;
          time_minutes: number;
          price: number;
        };
        Update: {
          id?: string;
          name?: string;
          time_minutes?: number;
          price?: number;
        };
      };
      reservations: {
        Row: {
          id: string;
          start_at: string;
          end_at: string;
          operation_id: string;
          visitor_id: string;
        };
        Insert: {
          id: string;
          start_at: string;
          end_at: string;
          operation_id: string;
          visitor_id: string;
        };
        Update: {
          id?: string;
          start_at?: string;
          end_at?: string;
          operation_id?: string;
          visitor_id?: string;
        };
      };
    };
  };
}