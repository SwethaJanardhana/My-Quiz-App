import { questions } from "./data.js";

console.log(questions);

const bookMarkedElement = document.querySelector('[data-js="bookMark"]');

const questionNumberElement = document.querySelector(
  '[data-js="question-number"]'
);
const questionElement = document.querySelector('[data-js="question"]');

const answerOptionsButton = document.querySelector(
  '[data-js="answer-options"]'
);
const nextButton = document.querySelector('[data-js="next"]');
const showAnswerButton = document.querySelector('[data-js="show-answer"]');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showAnswerButton.innerHTML = "Show Answer";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionNumberElement.innerHTML = questionNumber + ": Guess the flag";
  questionElement.innerHTML = currentQuestion.question;
  questionElement.classList.add("flag_size");

  if (currentQuestion.bookMark) {
    bookMarkedElement.classList.add("bookmarked");
    bookMarkedElement.classList.remove("bookmark");
    bookMarkedElement.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" /></svg>';
  } else {
    bookMarkedElement.classList.add("bookmark");
    bookMarkedElement.classList.remove("bookmarked");
    bookMarkedElement.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z" /></svg>';
  }

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
  bookMarkedElement.bookMark = false;
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
  questionNumberElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  questionElement.removeChild(questionElement.firstChild);
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  bookMarkedElement.style.display = "none";
  showAnswerButton.style.display = "none";
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

showAnswerButton.addEventListener("click", () => {
  Array.from(answerOptionsButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
});

bookMarkedElement.addEventListener("click", () => {
  let currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.bookMark) {
    currentQuestion.bookMark = false;
    bookMarkedElement.classList.remove("bookmarked");
    bookMarkedElement.classList.add("bookmark");
    bookMarkedElement.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z" /></svg>';
  } else {
    currentQuestion.bookMark = true;
    bookMarkedElement.classList.add("bookmarked");
    bookMarkedElement.classList.remove("bookmark");
    bookMarkedElement.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" /></svg>';
  }
});

startQuiz();

//export { questions };
/* Load Bookmark Page */
