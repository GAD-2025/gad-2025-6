// A mock function to simulate fetching quizzes
export const getQuizzes = async () => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would fetch this data from your backend
  return [
    {
      id: 1,
      title: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      id: 2,
      title: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: '4',
    },
  ];
};

// A mock function to simulate creating a quiz
export const createQuiz = async (quiz) => {
  console.log('Creating quiz:', quiz);
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send the new quiz to your backend
  return {
    success: true,
    quiz: {
      id: Math.floor(Math.random() * 1000) + 3, // Generate a random ID
      ...quiz,
    },
  };
};
