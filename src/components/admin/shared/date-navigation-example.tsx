'use client';

import { useState } from 'react';
import { DateNavigation } from './date-navigation';

export function DateNavigationComponent() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    // Here you would typically update your data based on the selected date
  };

  return (
    <div className="flex space-y-6">
      <DateNavigation
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        className="bg-card flex w-full justify-between rounded-lg border p-4 shadow-sm"
      />
    </div>
  );
}
