let currentQuestion = 1;
const totalQuestions = 10;

// Initialize counters for each learning style (Visual, Auditory, Musical, etc.)
let answerCounts = {
    Visual: 0,
    Auditory: 0,
    Musical: 0,
    'Reading/Writing': 0,
    Kinesthetic: 0,
    Social: 0,
    Imagery: 0
};

// Track selected style and type, and notes text
let selectedStyle = null;
let selectedType = null;
let notesText = "";

// Get references to elements
const textarea = document.getElementById('notes-textarea');
const styleButtons = document.querySelectorAll('.style-button');
const typeButtons = document.querySelectorAll('.type-button');
const generateButton = document.getElementById('generate-btn');

// Function to enable/disable the Generate button
function checkConditions() {
  const isTextareaFilled = textarea.value.trim() !== "";
  const isStyleSelected = selectedStyle !== null;
  const isTypeSelected = selectedType !== null;

  // If all conditions are met, activate the generate button
  if (isTextareaFilled && isStyleSelected && isTypeSelected) {
    generateButton.disabled = false;
    generateButton.classList.add('active'); // Add the 'active' class to turn blue
  } else {
    generateButton.disabled = true;
    generateButton.classList.remove('active'); // Remove the 'active' class to return to default
  }

  // Log current state for debugging or tracking
  console.log("Text:", notesText);
  console.log("Selected Style:", selectedStyle);
  console.log("Selected Type:", selectedType);
}

// Function to handle button clicks (ensure only one button is active per section)
function handleButtonClick(buttons, button, category) {
  // Deactivate all buttons in the same section
  buttons.forEach(btn => btn.classList.remove('active'));
  // Activate the clicked button
  button.classList.add('active');
  
  // Update the selected style or type based on the category
  if (category === 'style') {
    selectedStyle = button.id;
  } else if (category === 'type') {
    selectedType = button.id;
  }

  checkConditions();
}

// Event listener for textarea input (track the notes text)
textarea.addEventListener('input', function() {
  notesText = textarea.value; // Update the notes text
  checkConditions();
});

// Event listeners for style buttons (only one can be active at a time)
styleButtons.forEach(button => {
  button.addEventListener('click', function() {
    handleButtonClick(styleButtons, button, 'style');
  });
});

// Event listeners for type buttons (only one can be active at a time)
typeButtons.forEach(button => {
  button.addEventListener('click', function() {
    handleButtonClick(typeButtons, button, 'type');
  });
});

// Initial check when the page loads
checkConditions();

// Function to redirect and generate the output
function redirectToPage() {
  // Ensure that the page updates with the selected style, type, and notes before redirect
  localStorage.setItem('selectedStyle', selectedStyle);
  localStorage.setItem('selectedType', selectedType);
  localStorage.setItem('notesText', notesText);
  window.location.href = 'ConvertOutput.html';
}

// This function will retrieve the selected style, type, and notes from localStorage and display them in the output file


// Display the selected style and type when the page loads in ConvertOutput.html
document.addEventListener("DOMContentLoaded", displaySelectedStyleAndType);

// Function to display the quiz results
function showQuestion(questionId) {
  // Hide all questions
  const allQuestions = document.querySelectorAll('.question');
  allQuestions.forEach((q) => {
    q.style.display = "none";
  });

  // Show the requested question
  const questionElement = document.getElementById(`question${questionId}`);
  if (questionElement) {
    questionElement.style.display = "block";
  }

  // Disable the continue button for the last question and handle submission
  const continueBtn = questionElement.querySelector(".continue-btn");
  if (questionId === totalQuestions) {
    continueBtn.textContent = "Submit";
    continueBtn.onclick = function() {
      submitQuiz();  // Handle quiz submission
    };
  } else {
    continueBtn.textContent = "Continue";
    continueBtn.onclick = function() {
      nextQuestion(questionId + 1);  // Continue to the next question
    };
  }
}

// Function to go to the next question in the quiz
function nextQuestion(next) {
  if (currentQuestion > totalQuestions) {
    return; // Do nothing if we're beyond the last question
  }

  // Check if at least one checkbox is checked in the current question
  const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
  const checkboxes = currentQuestionElement.querySelectorAll('input[type="checkbox"]');
  const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);

  if (!checked) {
    alert('Please select at least one option before continuing.');
    return; // Prevent moving to the next question
  }

  // Update answer counts based on selected checkboxes
  updateAnswerCount(currentQuestionElement);

  // Update current question
  currentQuestion = next;

  // Show next question
  showQuestion(currentQuestion);
}

// Update answer counts for the selected checkboxes
function updateAnswerCount(questionElement) {
  const checkboxes = questionElement.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      // Increment the corresponding answer count
      const answerValue = checkbox.value;
      if (answerCounts[answerValue] !== undefined) {
        answerCounts[answerValue]++;
      }
    }
  });
}

// Find the most preferred learning style based on the highest answer count
function findQuizResults() {
  let highestCount = 0;
  let typeOfLearning = '';
  
  for (let style in answerCounts) {
    if (answerCounts[style] > highestCount) {
      highestCount = answerCounts[style];
      typeOfLearning = style;
    }
  }
  
  return typeOfLearning;
}

// Function to handle quiz submission and display the results
function submitQuiz() {
  const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
  updateAnswerCount(currentQuestionElement);

  const allQuestions = document.querySelectorAll('.question');
  allQuestions.forEach((q) => {
    q.style.display = "none";
  });

  // Display the results
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = `
    <h2>Quiz Results:</h2>
    <p>Visual: ${answerCounts.Visual}</p>
    <p>Auditory: ${answerCounts.Auditory}</p>
    <p>Musical: ${answerCounts.Musical}</p>
    <p>Reading/Writing: ${answerCounts['Reading/Writing']}</p>
    <p>Kinesthetic: ${answerCounts.Kinesthetic}</p>
    <p>Social: ${answerCounts.Social}</p>
    <p>Imagery: ${answerCounts.Imagery}</p>
    <h2>${findQuizResults()} is your preferred learning style</h2>
  `;
  
  // Add the "Continue to Home" button
  const homeButton = document.createElement('button');
  homeButton.textContent = "Continue to Home";
  homeButton.onclick = function() {
    window.location.href = "home.html";  // Redirect to home.html
  };

  // Append the result and home button to the body
  document.body.appendChild(resultDiv);
  document.body.appendChild(homeButton);
}

// Show the first question when the page loads
document.addEventListener("DOMContentLoaded", function() {
  showQuestion(1);  // Show the first question when the page loads
});
