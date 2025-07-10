import { prisma } from '@/server/db';
import { getLastSaturdayOfMonth } from '@/utils/getLastSaturday';

export async function checkAndCreateEvent(year: number, month: number): Promise<void> {
  try {
    const lastSaturday = getLastSaturdayOfMonth(year, month);
    
    const existingEvent = await prisma.event.findFirst({
      where: {
        date: {
          gte: new Date(lastSaturday.getFullYear(), lastSaturday.getMonth(), lastSaturday.getDate()),
          lt: new Date(lastSaturday.getFullYear(), lastSaturday.getMonth(), lastSaturday.getDate() + 1)
        }
      }
    });

    if (existingEvent) {
      console.log(`Event already exists for ${lastSaturday.toDateString()}`);
      return;
    }

    const defaultChapter = await prisma.chapter.findFirst({
      where: { name: "Calgary" }
    });

    const newEvent = await prisma.event.create({
      data: {
        name: `${lastSaturday.toLocaleString('default', { month: 'long' })} ${lastSaturday.getDate()} - Project-based Mini-Hackathon`,
        date: lastSaturday,
        location: "Central Library, Calgary, AB",
        description: `Once a month we hold a "mini-hackathon" where we code from 10 AM to about 4:00 PM at which point we do a little show-and-tell where you are welcome to demo what you did that day (totally optional). It is a loosely structured event where we break off into groups and you can work on your own project, or hop into someone else's!`,
        startTime: "10:00 AM",
        image: null,
        isFeatured: false,
        chapterId: defaultChapter?.id || null,
      }
    });

    console.log(`Created new event for ${lastSaturday.toDateString()}:`, newEvent.id);
  } catch (error) {
    console.error('Error checking/creating event:', error);
    throw error;
  }
}