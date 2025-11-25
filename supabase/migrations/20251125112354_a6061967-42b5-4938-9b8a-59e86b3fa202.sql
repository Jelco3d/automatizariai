-- Create calendar_bookings table for caching Cal.com bookings
CREATE TABLE public.calendar_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id TEXT NOT NULL,
  booking_uid TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'accepted',
  meeting_url TEXT,
  location TEXT,
  attendees JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, booking_uid)
);

-- Enable Row Level Security
ALTER TABLE public.calendar_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for calendar_bookings
CREATE POLICY "Users can view their own bookings"
  ON public.calendar_bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON public.calendar_bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON public.calendar_bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings"
  ON public.calendar_bookings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_calendar_bookings_updated_at
  BEFORE UPDATE ON public.calendar_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on queries
CREATE INDEX idx_calendar_bookings_user_id ON public.calendar_bookings(user_id);
CREATE INDEX idx_calendar_bookings_start_time ON public.calendar_bookings(start_time);
CREATE INDEX idx_calendar_bookings_status ON public.calendar_bookings(status);