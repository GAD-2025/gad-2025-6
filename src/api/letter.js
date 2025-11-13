// A mock function to simulate fetching letters
export const getLetters = async () => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would fetch this data from your backend
  return [
    {
      id: 1,
      title: 'Letter to my future self',
      content: 'Dear future me, I hope you are doing well...',
      sendDate: '2025-12-31',
    },
    {
      id: 2,
      title: 'A letter to a friend',
      content: 'Hey John, I wanted to catch up with you...',
      sendDate: '2026-01-15',
    },
  ];
};

// A mock function to simulate sending a letter
export const sendLetter = async (letter) => {
  console.log('Sending letter:', letter);
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send the new letter to your backend
  return {
    success: true,
    letter: {
      id: Math.floor(Math.random() * 1000) + 3, // Generate a random ID
      ...letter,
    },
  };
};
