import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  bookingDates?: Date[];
}

export const CalendarView = ({ 
  selectedDate, 
  onDateSelect,
  bookingDates = []
}: CalendarViewProps) => {
  const modifiers = {
    hasBookings: bookingDates,
  };

  const modifiersStyles = {
    hasBookings: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
    </Card>
  );
};
