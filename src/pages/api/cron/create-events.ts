import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAndCreateEvent } from '@/server/schedules/loadEvents';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify this is actually a cron request from Vercel
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('Running scheduled event creation...');
  
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-indexed month
    
    // Check current month
    await checkAndCreateEvent(currentYear, currentMonth);
    
    // Also check next month to ensure we don't miss any events
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