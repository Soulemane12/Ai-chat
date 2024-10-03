// materials.js

// Retrieve user profile from local storage
const userProfile = JSON.parse(localStorage.getItem('userProfile'));

// Function to generate notes
function generateNotes(subject) {
  const notes = contentDatabase[subject].notes;
  return notes;
}

// Function to generate quiz
function generateQuiz(subject) {
  const quizQuestions = contentDatabase[subject].quizzes;
  return quizQuestions;
}

// Function to display materials based on learning style
function generateMaterials() {
  const materialsDiv = document.getElementById('materials');

  userProfile.subjects.forEach(subject => {
    const subjectContent = contentDatabase[subject];

    // Create subject heading
    const subjectHeading = document.createElement('h2');
    subjectHeading.textContent = subject;
    materialsDiv.appendChild(subjectHeading);

    // Generate and display notes
    const notes = generateNotes(subject);
    const notesDiv = document.createElement('div');
    notesDiv.classList.add('notes');
    notesDiv.innerHTML = `<p>${notes}</p>`;
    materialsDiv.appendChild(notesDiv);

    // Generate and display flashcards based on learning style
    if (userProfile.learningStyle === 'Visual') {
      subjectContent.flashcards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flashcard');
        cardDiv.innerHTML = `
          <p>${card.question}</p>
          <img src="path/to/image.jpg" alt="Visual Aid">
          <button onclick="alert('Answer: ${card.answer}')">Show Answer</button>
        `;
        materialsDiv.appendChild(cardDiv);
      });
    } else if (userProfile.learningStyle === 'Auditory') {
      subjectContent.flashcards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flashcard');
        cardDiv.innerHTML = `
          <p>${card.question}</p>
          <audio controls>
            <source src="path/to/audio.mp3" type="audio/mpeg">
          </audio>
          <button onclick="alert('Answer: ${card.answer}')">Show Answer</button>
        `;
        materialsDiv.appendChild(cardDiv);
      });
    } else if (userProfile.learningStyle === 'Kinesthetic') {
      subjectContent.flashcards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flashcard');
        cardDiv.innerHTML = `
          <p>${card.question}</p>
          <input type="text" placeholder="Type your answer">
          <button onclick="checkAnswer(this, '${card.answer}')">Check Answer</button>
        `;
        materialsDiv.appendChild(cardDiv);
      });
    }

    // Generate and display mini quiz
    const quizQuestions = generateQuiz(subject);
    const quizDiv = document.createElement('div');
    quizDiv.classList.add('quiz');

    quizQuestions.forEach((quiz, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('quiz-question');
      questionDiv.innerHTML = `<p>${index + 1}. ${quiz.question}</p>`;

      quiz.options.forEach(option => {
        const optionLabel = document.createElement('label');
        optionLabel.classList.add('quiz-option');
        optionLabel.innerHTML = `
          <input type="radio" name="quiz${index}" value="${option}">
          ${option}
        `;
        questionDiv.appendChild(optionLabel);
      });

      quizDiv.appendChild(questionDiv);
    });

    // Submit button for quiz
    const submitQuizBtn = document.createElement('button');
    submitQuizBtn.textContent = 'Submit Quiz';
    submitQuizBtn.onclick = function() {
      gradeQuiz(quizQuestions);
    };
    quizDiv.appendChild(submitQuizBtn);

    materialsDiv.appendChild(quizDiv);
  });
}

// Function to check answer for kinesthetic learners
function checkAnswer(button, correctAnswer) {
  const userAnswer = button.previousElementSibling.value.trim();
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    alert('Correct!');
  } else {
    alert(`Incorrect. The correct answer is ${correctAnswer}.`);
  }
}

// Function to grade the quiz
function gradeQuiz(quizQuestions) {
  let score = 0;
  quizQuestions.forEach((quiz, index) => {
    const selectedOption = document.querySelector(`input[name="quiz${index}"]:checked`);
    if (selectedOption && selectedOption.value === quiz.correctAnswer) {
      score++;
    }
  });
  alert(`You scored ${score} out of ${quizQuestions.length}`);
}

// Call the function to generate materials
generateMaterials();
