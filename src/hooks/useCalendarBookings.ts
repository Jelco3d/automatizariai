import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CalendarBooking {
  id: string;
  user_id: string;
  booking_id: string;
  booking_uid: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  duration: number;
  status: string;
  meeting_url: string | null;
  location: string | null;
  attendees: any[];
  metadata: any;
  created_at: string;
  updated_at: string;
}

export const useCalendarBookings = (date?: Date) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const targetDate = date || new Date();

  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  // Fetch bookings from database
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["calendar-bookings", startOfDay.toISOString()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calendar_bookings")
        .select("*")
        .gte("start_time", startOfDay.toISOString())
        .lte("end_time", endOfDay.toISOString())
        .order("start_time", { ascending: true });

      if (error) throw error;
      return data as CalendarBooking[];
    },
    refetchInterval: 60000, // Refetch every minute
  });

  // Sync with Cal.com
  const syncMutation = useMutation({
    mutationFn: async (syncDate?: Date) => {
      const { data, error } = await supabase.functions.invoke(
        "sync-calcom-bookings",
        {
          body: { date: (syncDate || targetDate).toISOString() },
        }
      );

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["calendar-bookings"] });
      toast({
        title: "Sincronizare reușită",
        description: `${data.count || 0} apeluri sincronizate cu Cal.com`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Eroare sincronizare",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const todaysBookings = bookings?.filter((booking) => {
    const bookingDate = new Date(booking.start_time);
    const today = new Date();
    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  });

  const upcomingBooking = todaysBookings?.find((booking) => {
    const startTime = new Date(booking.start_time);
    return startTime > new Date();
  });

  const activeBooking = todaysBookings?.find((booking) => {
    const now = new Date();
    const startTime = new Date(booking.start_time);
    const endTime = new Date(booking.end_time);
    return startTime <= now && endTime >= now;
  });

  return {
    bookings: bookings || [],
    todaysBookings: todaysBookings || [],
    upcomingBooking,
    activeBooking,
    isLoading,
    error,
    syncBookings: syncMutation.mutate,
    isSyncing: syncMutation.isPending,
  };
};
