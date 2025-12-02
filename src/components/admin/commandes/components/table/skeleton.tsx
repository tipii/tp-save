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
import { FileText, User, Flag, Activity, Calendar, Check, Ship } from 'lucide-react';

export function CommandesTableSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <TableHead>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Ref</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" />
                  <span>Client</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-red-600" />
                  <span>Priorité</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span>Statut</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>Date livr. prévue</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Date livr. réelle</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-cyan-600" />
                  <span>Expé. Île</span>
                </div>
              </TableHead>
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
                {/* Date livraison réelle */}
                <TableCell>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </TableCell>
                {/* Expé. Île */}
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-md" />
                </TableCell>
                {/* Actions */}
                <TableCell>
                  <Skeleton className="h-9 w-9 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-background border-t p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
