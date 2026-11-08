// main.js — Lumina battle system.
// Rules: 5 chances per monster. Get 3 correct to purify it.

const MAX_ATTEMPTS = 5;
const CORRECT_TO_WIN = 3;

let allQuestions = [];
let allMonsters = [];
let currentMonster = null;
let battleQuestions = [];
let attemptIndex = 0;
let correctCount = 0;

const monsterRankEl  = document.getElementById('monster-rank');
const monsterNameEl  = document.getElementById('monster-name');
const monsterDescEl  = document.getElementById('monster-desc');
const attemptDotsEl  = document.getElementById('attempt-dots');
const correctCountEl = document.getElementById('correct-count');
const progressEl     = document.getElementById('progress');
const questionEl     = document.getElementById('question');
const choicesEl      = document.getElementById('choices');
const feedbackEl     = document.getElementById('feedback');
const nextBtn        = document.getElementById('next-btn');
const quizArea       = document.getElementById('quiz-area');
const resultScreen   = document.getElementById('result-screen');
const resultIconEl   = document.getElementById('result-icon');
const resultTitleEl  = document.getElementById('result-title');
const resultMsgEl    = document.getElementById('result-message');
const retryBtn       = document.getElementById('retry-btn');

// Load questions and monsters, then start
Promise.all([
  fetch('data/questions.json').then(r => r.json()),
  fetch('data/monsters.json').then(r => r.json())
]).then(([qData, mData]) => {
  allQuestions = qData.dawnbloom;
  allMonsters  = mData.dawnbloom;
  startNewBattle();
}).catch(() => {
  questionEl.textContent = 'Could not load data. Open this page with Live Server.';
});

// Pick a random monster and 5 random questions, then reset state
function startNewBattle() {
  currentMonster  = allMonsters[Math.floor(Math.random() * allMonsters.length)];
  battleQuestions = shuffle(allQuestions).slice(0, MAX_ATTEMPTS);
  attemptIndex    = 0;
  correctCount    = 0;

  monsterRankEl.textContent = currentMonster.rank;
  monsterNameEl.textContent = currentMonster.name;
  monsterDescEl.textContent = currentMonster.description;

  buildAttemptDots();
  updateCorrectCount();

  resultScreen.classList.add('hidden');
  quizArea.classList.remove('hidden');
  showQuestion();
}

// Draw 5 empty attempt dots
function buildAttemptDots() {
  attemptDotsEl.innerHTML = '';
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const dot = document.createElement('span');
    dot.className = 'attempt-dot';
    dot.id = 'dot-' + i;
    attemptDotsEl.appendChild(dot);
  }
}

function updateCorrectCount() {
  correctCountEl.textContent = correctCount + ' / ' + CORRECT_TO_WIN + ' correct';
}

// Render the current question
function showQuestion() {
  const q = battleQuestions[attemptIndex];
  progressEl.textContent = 'Question ' + (attemptIndex + 1) + ' of ' + MAX_ATTEMPTS;
  questionEl.textContent = q.question;
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');
  nextBtn.dataset.action = '';

  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(i, q));
    choicesEl.appendChild(btn);
  });
}

// Process a chosen answer
function handleAnswer(chosen, q) {
  const isCorrect = chosen === q.answer;

  // Lock all buttons and color them
  choicesEl.querySelectorAll('.choice').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    if (i === chosen && !isCorrect) btn.classList.add('wrong');
  });

  // Fill the dot for this attempt
  const dot = document.getElementById('dot-' + attemptIndex);
  dot.classList.add(isCorrect ? 'dot-correct' : 'dot-wrong');

  // Update score and feedback
  if (isCorrect) {
    correctCount++;
    feedbackEl.textContent = '✓ ' + q.explanation;
    updateCorrectCount();
  } else {
    feedbackEl.textContent = '✗ ' + q.explanation;
  }

  // Did they just reach 3 correct? Win immediately.
  if (correctCount >= CORRECT_TO_WIN) {
    nextBtn.textContent = 'See Result';
    nextBtn.dataset.action = 'win';
    nextBtn.classList.remove('hidden');
    return;
  }

  attemptIndex++;

  // Used all 5 chances without winning
  if (attemptIndex >= MAX_ATTEMPTS) {
    nextBtn.textContent = 'See Result';
    nextBtn.dataset.action = 'lose';
  } else {
    nextBtn.textContent = 'Next Question';
    nextBtn.dataset.action = 'next';
  }
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  if (nextBtn.dataset.action === 'win')  showResult(true);
  else if (nextBtn.dataset.action === 'lose') showResult(false);
  else showQuestion();
});

retryBtn.addEventListener('click', startNewBattle);

// Show the purify or fail screen
function showResult(won) {
  quizArea.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  if (won) {
    resultIconEl.textContent = '✨';
    resultTitleEl.textContent = currentMonster.name + ' is purified!';
    resultMsgEl.textContent =
      'You answered ' + correctCount + ' out of ' + MAX_ATTEMPTS +
      ' correctly. The corruption lifts!';
  } else {
    resultIconEl.textContent = '💀';
    resultTitleEl.textContent = 'Not enough...';
    resultMsgEl.textContent =
      'You got ' + correctCount + ' correct — you need ' + CORRECT_TO_WIN +
      '. The monster remains corrupted. Try again!';
  }
}

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
