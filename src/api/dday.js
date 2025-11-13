// A mock function to simulate fetching D-Day events
export const getDDayEvents = async () => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would fetch this data from your backend
  return [
    {
      id: 1,
      title: 'London trip',
      date: '2025-12-25',
    },
    {
      id: 2,
      title: 'Our Anniversary',
      date: '2026-03-21',
    },
    {
      id: 3,
      title: 'Next Visit to Paris',
      date: '2026-03-21',
    },
  ];
};

// A mock function to simulate adding a D-Day event
export const addDDayEvent = async (event) => {
  console.log('Adding D-Day event:', event);
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send the new event to your backend
  return {
    success: true,
    event: {
      id: Math.floor(Math.random() * 1000) + 4, // Generate a random ID
      ...event,
    },
  };
};
