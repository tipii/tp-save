import { z } from 'zod';
import { adminProcedure } from '../init';
import { tasks } from '@trigger.dev/sdk/v3';
import type { syncBonsFromSageScheduled } from '@/trigger/scrap_sage_data';

export const triggerRouter = {
  syncBonsFromSage: adminProcedure.input(z.object({})).mutation(async ({ input, ctx }) => {
    console.log('syncBonsFromSage');
    try {
      const handle = await tasks.trigger<typeof syncBonsFromSageScheduled>(
        'tallin-pi-sync-commandes',
        {
          timestamp: new Date(),
          timezone: 'UTC',
          scheduleId: 'manual-trigger',
          type: 'IMPERATIVE',
          upcoming: [],
        },
      );

      console.log('result', handle);

      return {
        success: true,
        handle,
      };
    } catch (error) {
      console.log('error', error);
      return {
        success: false,
        error: String(error),
      };
    }
  }),
};
