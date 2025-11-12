import { z } from 'zod';
import { adminProcedure } from '../init';
import { tasks } from '@trigger.dev/sdk';
import type { syncBonsFromSageScheduled } from '@/trigger/scrap_sage_data';

export const triggerRouter = {
  syncBonsFromSage: adminProcedure.input(z.object({})).mutation(async ({ input, ctx }) => {
    console.log('syncBonsFromSage - triggering production task');
    try {
      // Trigger the scheduled task imperatively in production
      const handle = await tasks.trigger<typeof syncBonsFromSageScheduled>(
        'tallin-pi-sync-commandes',
        {
          timestamp: new Date(),
          timezone: 'Pacific/Tahiti',
          scheduleId: 'manual-trigger',
          type: 'IMPERATIVE',
          upcoming: [],
        },
      );

      return { success: true, handle };
    } catch (error) {
      console.error('Error triggering task:', error);
      return {
        success: false,
        error: String(error),
      };
    }
  }),
};
