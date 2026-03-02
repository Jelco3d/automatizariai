import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, CalendarDays } from "lucide-react";
import { useCalendarBookings } from "@/hooks/useCalendarBookings";
import { BookingCard } from "@/components/business/calendar/BookingCard";
import { CalendarView } from "@/components/business/calendar/CalendarView";
import { TodaysSummary } from "@/components/business/calendar/TodaysSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";

const Calendar = () => {
  const navigate = useNavigate();
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const { bookings, todaysBookings, activeBooking, upcomingBooking, isLoading: isLoadingBookings, syncBookings, isSyncing } = useCalendarBookings(selectedDate);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setIsInitLoading(false);
        syncBookings(new Date());
      }
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate, syncBookings]);

  if (isInitLoading) {
    return (
      <PageShell loading={true}>
        <div />
      </PageShell>
    );
  }

  const bookingDates = bookings.map(b => new Date(b.start_time));

  return (
    <PageShell>
      <PageHeader
        title="Calendar Apeluri"
        subtitle="Gestionează apelurile programate prin Cal.com"
        action={
          <Button onClick={() => syncBookings(selectedDate)} disabled={isSyncing} className="gap-2 glass-card border border-white/[0.08] hover:bg-white/[0.04] text-gray-300">
            <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            Sincronizează
          </Button>
        }
      />

      <TodaysSummary bookings={todaysBookings} />

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-1">
          <CalendarView selectedDate={selectedDate} onDateSelect={(date) => date && setSelectedDate(date)} bookingDates={bookingDates} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Apeluri pentru {selectedDate.toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </h2>

          {isLoadingBookings ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full bg-white/5 rounded-xl" />)}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-xl border border-dashed border-white/[0.08]">
              <CalendarDays className="h-12 w-12 mx-auto text-gray-600 mb-4" />
              <p className="text-sm font-medium text-gray-500">Nu sunt apeluri programate pentru această zi</p>
              <p className="text-xs text-gray-600 mt-1">Apelurile din Cal.com vor apărea aici automat</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBooking && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-purple-400 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                    </span>
                    Apel Activ
                  </h3>
                  <BookingCard booking={activeBooking} />
                </div>
              )}
              {upcomingBooking && !activeBooking && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-400">Următorul Apel</h3>
                  <BookingCard booking={upcomingBooking} />
                </div>
              )}
              {bookings.filter(b => b.id !== activeBooking?.id && b.id !== upcomingBooking?.id).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default Calendar;
