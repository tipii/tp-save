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
            <TableHead>Bon Préparation</TableHead>
            <TableHead>Bon Livraison</TableHead>
            <TableHead>Livraison(s)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Articles totaux</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow key={index} className="p-4 py-12">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex w-full items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-4" />
                  </div>
                  <div className="grid w-full grid-cols-3">
                    <div className="flex flex-col items-end justify-evenly gap-0">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div className="flex flex-col items-center gap-0" key={i}>
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </TableCell>
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
