import moment from 'moment';

interface MockData {
  id: string;
  timestamp: {
    iso: string;
    relative: string;
    calendar: string;
    formatted: string;
    day: string;
    month: string;
    year: string;
    time: string;
  };
  event: string;
}

const events = [
  'User Login',
  'Page View',
  'Button Click',
  'Form Submission',
  'Error Logged',
  'Transaction Completed',
  'File Upload',
  'Session Timeout'
];

export const generateMockData = (count: number): MockData[] => {
  const data: MockData[] = [];
  const now = moment();

  for (let i = 0; i < count; i++) {
    // Generate a random time within the last 30 days
    const randomDays = Math.floor(Math.random() * 30);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    
    const date = now.subtract(randomDays, 'days').subtract(randomHours, 'hours').subtract(randomMinutes, 'minutes');

    data.push({
      id: Math.random().toString(36).substring(7),
      timestamp: {
        iso: date.toISOString(),
        relative: date.fromNow(),
        calendar: date.calendar(),
        formatted: date.format('MMMM Do YYYY, h:mm:ss a'),
        day: date.format('dddd'),
        month: date.format('MMMM'),
        year: date.format('YYYY'),
        time: date.format('LT')
      },
      event: events[Math.floor(Math.random() * events.length)]
    });
  }

  // Sort by date descending (newest first)
  return data.sort((a, b) => moment(b.timestamp.iso).diff(moment(a.timestamp.iso)));
};
