import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';

export type StatItem = {
  label: string;
  value: string | number;
  description?: string;
  trend?: { value: number; isUp: boolean };
  icon?: React.ReactNode;
};

export default function Stats({
  stats,
  isLoading = false,
}: {
  stats: StatItem[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, idx) => (
        <Card key={idx}>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm">
              {s.icon}
              <span>{s.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              {s.description ? (
                <div className="text-muted-foreground text-xs">{s.description}</div>
              ) : null}
            </div>
            {s.trend ? (
              <div
                className={
                  s.trend.isUp
                    ? 'inline-flex items-center gap-1 text-sm text-emerald-600'
                    : 'inline-flex items-center gap-1 text-sm text-rose-600'
                }
              >
                {s.trend.isUp ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{s.trend.value}%</span>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
