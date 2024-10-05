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

function  findQuizResults(){
    let highestint =0;
    let TypeOfLearning=0;
   for(let i=1;i< Object.keys(answerCounts).length;i++){
      highestint = answerCounts[Object.keys(answerCounts)[0]];
     if(answerCounts[Object.keys(answerCounts)[i]]>highestint){
        highestint = answerCounts[Object.keys(answerCounts)[i]];
        TypeOfLearning = i;
     }
     
   }
   return Object.keys(answerCounts)[TypeOfLearning];
}
function submitQuiz() {
    // Hide all questions
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    const checkboxes = currentQuestionElement.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);

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
        <h2>${findQuizResults()}: is your prefered learning style </h2>
       

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

document.addEventListener("DOMContentLoaded", function() {
    // Select all links in the navigation
    const links = document.querySelectorAll(".header-center nav ul li a");
  
    // Loop through each link and add the 'active' class to the correct link
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  });

  
