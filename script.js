// script.js
document.getElementById('userTest').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Collecting the user's input
    const learningStyle = document.querySelector('input[name="learningStyle"]:checked').value;
    const subjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked')).map(el => el.value);
    const studyTime = document.querySelector('select[name="studyTime"]').value;
  
    // Creating a user profile object
    const userProfile = {
      learningStyle: learningStyle,
      subjects: subjects,
      studyTime: studyTime
    };
  
    // Saving user profile to local storage (or send to server)
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  
    // Redirect to personalized study materials page
    window.location.href = 'studyMaterials.html';
  });
  