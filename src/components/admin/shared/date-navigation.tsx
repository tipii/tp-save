'use client';

import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateNavigationProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  className?: string;
}

export function DateNavigation({
  selectedDate = new Date(),
  onDateChange,
  className,
}: DateNavigationProps) {
  const [date, setDate] = useState<Date>(selectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const goToPreviousDay = () => {
    const previousDay = subDays(date, 1);
    handleDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = addDays(date, 1);
    handleDateChange(nextDay);
  };

  const goToToday = () => {
    const today = new Date();
    handleDateChange(today);
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      handleDateChange(selectedDate);
      setIsCalendarOpen(false);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Yesterday Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousDay}
        className="h-9 w-9 p-0"
        title="Jour précédent"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Current Date Display */}
      <div className="flex items-center gap-2">
        <div className="flex min-w-[120px] flex-col items-center">
          <div className="text-sm font-medium">{format(date, 'EEEE', { locale: fr })}</div>
          <div className="text-lg font-semibold">{format(date, 'dd/MM/yyyy')}</div>
        </div>

        {/* Calendar Popover */}
      </div>

      <div className="flex items-center gap-2">
        {/* Tomorrow Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextDay}
          className="h-9 w-9 p-0"
          title="Jour suivant"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0"
              title="Ouvrir le calendrier"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleCalendarSelect}
              autoFocus
              locale={fr}
            />
            <div className="border-t p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="w-full"
                disabled={isToday(date)}
              >
                Aujourd'hui
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
