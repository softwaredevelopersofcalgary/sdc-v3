import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAndCreateEvent } from '@/server/schedules/loadEvents';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET ?? ''}`) {
    return res.status(401).json({ error: 'Unauthorized at Cron' });
  }

  console.log('Running scheduled event creation...');
  
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    await checkAndCreateEvent(currentYear, currentMonth);
    
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    await checkAndCreateEvent(nextYear, nextMonth);
    
    console.log('Scheduled event creation completed successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Event creation check completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error during scheduled event creation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create events',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}