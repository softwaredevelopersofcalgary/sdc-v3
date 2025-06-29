// Helper function to find the last Saturday of a given month/year
export function getLastSaturdayOfMonth(year: number, month: number): Date {
  // Get the last day of the month
  const lastDay = new Date(year, month, 0); // month is 0-indexed, so this gets last day of previous month
  const lastDate = lastDay.getDate();
  
  // Find the last Saturday
  // Saturday is day 6 in JavaScript (0 = Sunday, 6 = Saturday)
  let lastSaturday = lastDate;
  const lastDayOfWeek = lastDay.getDay();
  
  if (lastDayOfWeek === 6) {
    // Last day is already Saturday
    lastSaturday = lastDate;
  } else {
    // Calculate days to go back to find last Saturday
    const daysToSubtract = (lastDayOfWeek + 1) % 7;
    lastSaturday = lastDate - daysToSubtract;
  }
  
  return new Date(year, month - 1, lastSaturday); // month - 1 because Date constructor expects 0-indexed month
}
