import { format, formatDistanceToNow, isPast, isFuture } from "date-fns";
import { ro } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Video, CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { CalendarBooking } from "@/hooks/useCalendarBookings";

interface BookingCardProps {
  booking: CalendarBooking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  const now = new Date();
  const isActive = startTime <= now && endTime >= now;
  const isUpcoming = isFuture(startTime);
  const isCompleted = isPast(endTime);

  const getStatusIcon = () => {
    if (booking.status === "cancelled") return <XCircle className="h-4 w-4" />;
    if (isActive) return <Clock3 className="h-4 w-4 animate-pulse" />;
    if (isCompleted) return <CheckCircle2 className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getStatusVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    if (booking.status === "cancelled") return "destructive";
    if (isActive) return "default";
    if (isCompleted) return "secondary";
    return "outline";
  };

  const getStatusText = () => {
    if (booking.status === "cancelled") return "Anulat";
    if (isActive) return "În desfășurare";
    if (isCompleted) return "Finalizat";
    if (isUpcoming) return formatDistanceToNow(startTime, { addSuffix: true, locale: ro });
    return "Programat";
  };

  const attendeesList = Array.isArray(booking.attendees) ? booking.attendees : [];

  return (
    <Card className={`transition-all ${isActive ? "border-primary shadow-lg" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">{booking.title}</CardTitle>
            {booking.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {booking.description}
              </p>
            )}
          </div>
          <Badge variant={getStatusVariant()} className="shrink-0 gap-1">
            {getStatusIcon()}
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{format(startTime, "EEEE, d MMMM yyyy", { locale: ro })}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")} ({booking.duration} min)
            </span>
          </div>

          {booking.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{booking.location}</span>
            </div>
          )}

          {attendeesList.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {attendeesList.map((a: any) => a.name || a.email).join(", ")}
              </span>
            </div>
          )}
        </div>

        {booking.meeting_url && booking.status !== "cancelled" && (
          <Button
            className="w-full gap-2"
            onClick={() => window.open(booking.meeting_url!, "_blank")}
            disabled={!isActive && !isUpcoming}
          >
            <Video className="h-4 w-4" />
            {isActive ? "Intră în Apel" : "Deschide Link"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
