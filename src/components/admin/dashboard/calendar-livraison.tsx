import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import React from 'react';

export default function CalendarLivraison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendrier des livraisons
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-3">Calendrier</div>
      </CardContent>
    </Card>
  );
}
