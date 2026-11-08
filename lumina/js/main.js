// main.js — simple test quiz for the Dawnbloom questions.
// Loads questions.json and lets the player answer them one by one.

// Where we store the loaded questions and which one we are on.
let questions = [];
let currentIndex = 0;

// Grab the page elements we need to update.
const progressEl = document.getElementById('progress');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

// Load the questions from data/questions.json.
// fetch() needs a server, so open this with VS Code Live Server.
fetch('data/questions.json')
  .then((res) => res.json())
  .then((data) => {
    questions = data.dawnbloom;
    showQuestion();
  })
  .catch((err) => {
    questionEl.textContent = 'Could not load questions. Open this page with Live Server.';
    console.error(err);
  });

// Show the current question on the page.
function showQuestion() {
  const q = questions[currentIndex];

  progressEl.textContent = 'Question ' + (currentIndex + 1) + ' of ' + questions.length;
  questionEl.textContent = q.question;
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');

  // Clear old choice buttons.
  choicesEl.innerHTML = '';

  // Make one button for each choice.
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(i, q));
    choicesEl.appendChild(btn);
  });
}

// Called when the player clicks a choice.
function handleAnswer(chosen, q) {
  const buttons = choicesEl.querySelectorAll('.choice');

  // Disable all choices and highlight the correct and wrong ones.
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    if (i === chosen && chosen !== q.answer) btn.classList.add('wrong');
  });

  // Show feedback with Sage's explanation.
  if (chosen === q.answer) {
    feedbackEl.textContent = 'Correct! ' + q.explanation;
  } else {
    feedbackEl.textContent = 'Not quite. ' + q.explanation;
  }

  // Decide what the Next button should say.
  if (currentIndex < questions.length - 1) {
    nextBtn.textContent = 'Next question';
  } else {
    nextBtn.textContent = 'Restart';
  }
  nextBtn.classList.remove('hidden');
}

// Go to the next question (or restart at the end).
nextBtn.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  }
  showQuestion();
});
