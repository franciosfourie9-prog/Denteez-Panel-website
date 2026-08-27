export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string | null;
  damage_description: string;
  preferred_date: string;
  preferred_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year?: string;
  damage_description: string;
  preferred_date: string;
  preferred_time: string;
}
