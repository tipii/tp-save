'use client';

import { useState } from 'react';
import { DateNavigation } from './date-navigation';

export function DateNavigationComponent({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  return (
    <div className="flex space-y-6">
      <DateNavigation
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        className="bg-card flex w-full justify-between border-b border-gray-200 p-4"
      />
    </div>
  );
}
