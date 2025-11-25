import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { RefreshCw, CalendarDays } from "lucide-react";
import { useCalendarBookings } from "@/hooks/useCalendarBookings";
import { BookingCard } from "@/components/business/calendar/BookingCard";
import { CalendarView } from "@/components/business/calendar/CalendarView";
import { TodaysSummary } from "@/components/business/calendar/TodaysSummary";
import { Skeleton } from "@/components/ui/skeleton";

const Calendar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const { 
    bookings, 
    todaysBookings, 
    activeBooking,
    upcomingBooking,
    isLoading: isLoadingBookings,
    syncBookings, 
    isSyncing 
  } = useCalendarBookings(selectedDate);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setIsLoading(false);
        // Auto-sync on mount
        syncBookings(new Date());
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, syncBookings]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const bookingDates = bookings.map(b => new Date(b.start_time));

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <CalendarDays className="h-8 w-8 text-primary" />
                Calendar Apeluri
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestionează apelurile programate prin Cal.com
              </p>
            </div>
            <Button
              onClick={() => syncBookings(selectedDate)}
              disabled={isSyncing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
              Sincronizează
            </Button>
          </div>

          {/* Today's Summary */}
          <TodaysSummary bookings={todaysBookings} />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Calendar Sidebar */}
            <div className="lg:col-span-1">
              <CalendarView
                selectedDate={selectedDate}
                onDateSelect={(date) => date && setSelectedDate(date)}
                bookingDates={bookingDates}
              />
            </div>

            {/* Bookings List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">
                Apeluri pentru {selectedDate.toLocaleDateString("ro-RO", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </h2>

              {isLoadingBookings ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-48 w-full" />
                  ))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                  <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Nu sunt apeluri programate pentru această zi
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Apelurile din Cal.com vor apărea aici automat
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBooking && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-primary flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Apel Activ
                      </h3>
                      <BookingCard booking={activeBooking} />
                    </div>
                  )}

                  {upcomingBooking && !activeBooking && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-blue-600">Următorul Apel</h3>
                      <BookingCard booking={upcomingBooking} />
                    </div>
                  )}

                  {bookings
                    .filter(b => b.id !== activeBooking?.id && b.id !== upcomingBooking?.id)
                    .map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
