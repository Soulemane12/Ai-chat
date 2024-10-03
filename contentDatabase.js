// contentDatabase.js
const contentDatabase = {
    Math: {
      notes: "Mathematics is the study of numbers, shapes, and patterns.",
      flashcards: [
        { question: "What is 2 + 2?", answer: "4" },
        { question: "What is the derivative of x²?", answer: "2x" },
        // More flashcards...
      ],
      quizzes: [
        {
          question: "What is the integral of 1/x dx?",
          options: ["ln|x| + C", "x ln x - x + C", "eˣ + C", "1/(x²) + C"],
          correctAnswer: "ln|x| + C"
        },
        // More quiz questions...
      ]
    },
    Science: {
      notes: "Science involves the systematic study of the structure and behavior of the physical and natural world through observation and experiment.",
      flashcards: [
        { question: "What is H₂O commonly known as?", answer: "Water" },
        { question: "What force keeps planets in orbit around the sun?", answer: "Gravity" },
        // More flashcards...
      ],
      quizzes: [
        {
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
          correctAnswer: "Mitochondria"
        },
        // More quiz questions...
      ]
    },
    History: {
      notes: "History is the study of past events, particularly in human affairs.",
      flashcards: [
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        // More flashcards...
      ],
      quizzes: [
        {
          question: "In which year did World War II end?",
          options: ["1945", "1939", "1918", "1963"],
          correctAnswer: "1945"
        },
        // More quiz questions...
      ]
    },
    Literature: {
      notes: "Literature is written works, especially those considered of superior or lasting artistic merit.",
      flashcards: [
        { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
        // More flashcards...
      ],
      quizzes: [
        {
          question: "What is the main theme of '1984' by George Orwell?",
          options: ["Totalitarianism", "Love", "Adventure", "Comedy"],
          correctAnswer: "Totalitarianism"
        },
        // More quiz questions...
      ]
    }
  };
  