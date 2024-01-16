import { questions } from "./bookMarkedData.js";

function loadBookMarkPage() {
  const boookmarkElement = document.querySelector('[data-js="bookmark-main"]');
  let noOfQuestions = questions.length;
  let currentQuestionIndex = 0;
  while (currentQuestionIndex < noOfQuestions) {
    let currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.bookMark) {
      let questionNumber = currentQuestionIndex + 1;
      const sectionElement = document.createElement("section");
      sectionElement.classList.add("app");

      const bookMarkElement = document.createElement("span");
      bookMarkElement.classList.add("bookmarked");
      bookMarkElement.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" /></svg>';

      bookMarkElement.setAttribute("data-js", `bookMark${questionNumber}`);
      bookMarkElement.setAttribute("question", `${questionNumber}`);

      const h1QuestionElement = document.createElement("h1");
      h1QuestionElement.innerHTML = questionNumber + ": Guess the flag";

      const articleElement = document.createElement("article");
      sectionElement.append(bookMarkElement, h1QuestionElement, articleElement);

      const h2Element = document.createElement("h2");
      h2Element.innerHTML = currentQuestion.question;
      h2Element.classList.add("flag_size");

      const divElement = document.createElement("div");
      divElement.classList.add("answer-options");
      currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-button");
        divElement.appendChild(button);
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
      });

      const showAnswerButton = document.createElement("button");
      showAnswerButton.classList.add("show-answer");
      showAnswerButton.innerHTML = "Show Answer";
      showAnswerButton.setAttribute("data-js", "showAnswer");

      showAnswerButton.addEventListener("click", showAnswer);

      function showAnswer() {
        if (showAnswerButton.innerHTML.trim() === "Hide Answer") {
          showAnswerButton.innerHTML = "Show Answer";
          Array.from(divElement.children).forEach((button) => {
            if (button.dataset.correct === "true") {
              button.classList.remove("correct");
            }
          });
        } else {
          showAnswerButton.innerHTML = "Hide Answer";
          Array.from(divElement.children).forEach((button) => {
            if (button.dataset.correct === "true") {
              button.classList.add("correct");
            }
            button.disabled = true;
          });
        }
      }

      const divForButton = document.createElement("div");
      divForButton.classList.add("buttons-align");
      divForButton.appendChild(showAnswerButton);

      articleElement.append(h2Element, divElement, divForButton);

      boookmarkElement.append(sectionElement);
    }
    currentQuestionIndex++;
  }

  let bookMark = document.querySelector("[data-js='bookMark1']");
  if (bookMark != null) {
    bookMark.addEventListener("click", () => {
      if (confirm("Are you sure you want to remove bookmark?")) {
        let questionIndex = bookMark.getAttribute("question");
        let currentQuestion = questions[questionIndex - 1];
        currentQuestion.bookMark = false;
        boookmarkElement.innerHTML = "";
        loadBookMarkPage();
      }
    });
  }
}

loadBookMarkPage();
