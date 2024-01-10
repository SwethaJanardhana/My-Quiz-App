const questions = [
  {
    question: "Which is my country?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Japan", correct: false },
      { text: "India", correct: true },
      { text: "Singapore", correct: false },
    ],
  },
  {
    question: "What is your name?",
    answers: [
      { text: "Swetha", correct: true },
      { text: "Deepa", correct: false },
      { text: "Manju", correct: false },
      { text: "Shuba", correct: false },
    ],
  },
];

const questionElement = document.querySelector('[data-js="question"]');
const answerOptionsButton = document.querySelector(
  '[data-js="answer-options"]'
);
const nextButton = document.querySelector('[data-js="next"]');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ": " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-button");
    answerOptionsButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerOptionsButton.firstChild) {
    answerOptionsButton.removeChild(answerOptionsButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedOption = e.target;
  const isCorrect = selectedOption.dataset.correct === "true";
  if (isCorrect) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("Incorrect");
  }
  Array.from(answerOptionsButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out od ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
