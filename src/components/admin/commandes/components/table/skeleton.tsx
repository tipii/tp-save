import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function CommandesTableSkeleton() {
  return (
    <div className="flex h-full flex-col space-y-4">
      <Table className="min-h-0 flex-1 overflow-y-auto">
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <TableHead>Nom</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Priorité BP</TableHead>
            <TableHead>Statut BP</TableHead>
            <TableHead>Date livraison</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow key={index} className="p-4 py-12">
              {/* Nom (Ref Badge) */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </TableCell>
              {/* Client */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </TableCell>
              {/* Priorité BP */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </TableCell>
              {/* Statut BP */}
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              {/* Date livraison */}
              <TableCell>
                <Skeleton className="h-6 w-24 rounded-full" />
              </TableCell>
              {/* Date création */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </TableCell>
              {/* Actions */}
              <TableCell>
                <Skeleton className="h-9 w-9 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </div>
  );
}
