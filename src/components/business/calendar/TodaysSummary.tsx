import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import type { CalendarBooking } from "@/hooks/useCalendarBookings";

interface TodaysSummaryProps {
  bookings: CalendarBooking[];
}

export const TodaysSummary = ({ bookings }: TodaysSummaryProps) => {
  const totalDuration = bookings.reduce((sum, booking) => sum + booking.duration, 0);
  const completedBookings = bookings.filter((b) => {
    const endTime = new Date(b.end_time);
    return endTime < new Date() && b.status !== "cancelled";
  }).length;

  const stats = [
    {
      title: "Total Apeluri",
      value: bookings.length,
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Timp Total",
      value: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
      icon: Clock,
      color: "text-purple-500",
    },
    {
      title: "Finalizate",
      value: completedBookings,
      icon: CheckCircle2,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
