'use client';

import { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getTahitiToday, toTahitiTime, normalizeToTahitiDay } from '@/lib/date-utils';

interface DateNavigationProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  className?: string;
}

export function DateNavigation({
  selectedDate = getTahitiToday(),
  onDateChange,
  className,
}: DateNavigationProps) {
  // Normalize selectedDate to Tahiti timezone day
  const normalizedSelectedDate = selectedDate
    ? normalizeToTahitiDay(selectedDate)
    : getTahitiToday();

  const [date, setDate] = useState<Date>(normalizedSelectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Sync internal state when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setDate(normalizeToTahitiDay(selectedDate));
    }
  }, [selectedDate]);

  const handleDateChange = (newDate: Date) => {
    // Normalize to Tahiti timezone day before setting
    const normalized = normalizeToTahitiDay(newDate);
    setDate(normalized);
    onDateChange?.(normalized);
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
    const today = getTahitiToday();
    handleDateChange(today);
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      handleDateChange(selectedDate);
      setIsCalendarOpen(false);
    }
  };

  const isToday = (date: Date) => {
    const today = getTahitiToday();
    const tahitiDate = toTahitiTime(date);
    const tahitiToday = toTahitiTime(today);
    return (
      tahitiDate.getDate() === tahitiToday.getDate() &&
      tahitiDate.getMonth() === tahitiToday.getMonth() &&
      tahitiDate.getFullYear() === tahitiToday.getFullYear()
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
          <div className="text-sm font-medium">
            {format(toTahitiTime(date), 'EEEE', { locale: fr })}
          </div>
          <div className="text-lg font-semibold">{format(toTahitiTime(date), 'dd/MM/yyyy')}</div>
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
              selected={toTahitiTime(date)}
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
