var intro = document.querySelector(".criteriapage");
var crit = document.querySelector(".quiz-criteria");
var startBtn = document.querySelector("startedBtn");
//startBtn.classList.add(".startedBtn:hover");
var timer = document.getElementById("timer");
var answers = document.querySelectorAll("#questArea button");
var time = 60;
var score = 0;
var quizCount = 0;
var recordArray = [];
var userScores = [];
var clock;
var setTime;

var pageContentEl = function (element) {
  return document.querySelector(element);
};
//hide sections
var onlyDisplaySection = function (element) {
  let sections = document.querySelectorAll("section");
  Array.from(sections).forEach(function (userItem) {
    userItem.classList.add("hidden");
  });
  pageContentEl(element).classList.remove("hidden");
};
//user score
var quizUpdate = function (answerCopy) {
  pageContentEl("#achievedScore p").innerHTML = answerCopy;
  pageContentEl("#achievedScore").classList.remove("gone", achievedScore());
  Array.from(answers).forEach((answer) => {
    answer.classList.add("disable");
  });
  //end of test
  setTimeout(function () {
    if (quizCount === questions.length) {
      onlyDisplaySection("#finish");
      time = 0;
      pageContentEl("#time").innerHTML = time;
    } else {
      setQuestionData();
      Array.from(answers).forEach((answer) => {
        answer.classList.remove("disable");
      });
    }
  }, 1000);
};
//timer
var counterTimer = function () {
  if (time > 0) {
    time = time - 1;
    pageContentEl("#time").innerHTML = time;
    //score at end of test
  } else {
    clearInterval(clock);
    pageContentEl("#score").innerHTML = score;
    onlyDisplaySection("#finish");
  }
};

//test questions code
var setQuestionData = function () {
  pageContentEl("#questArea p").innerHTML = questions[quizCount].questionInfo;
  pageContentEl(
    "#questArea button:nth-of-type(1)"
  ).innerHTML = `1. ${questions[quizCount].choices[0]}`;
  pageContentEl(
    "#questArea button:nth-of-type(2)"
  ).innerHTML = `2. ${questions[quizCount].choices[1]}`;
  pageContentEl(
    "#questArea button:nth-of-type(3)"
  ).innerHTML = `3. ${questions[quizCount].choices[2]}`;
  pageContentEl(
    "#questArea button:nth-of-type(4)"
  ).innerHTML = `4. ${questions[quizCount].choices[3]}`;
};
//test questiosn and answers
var questions = [
  {
    questionInfo: "Commonly Used Data types do NOT include",
    choices: ["strings", "booleans", "allerts", "numbers"],
    answer: "allerts",
  },
  {
    questionInfo:
      "The condition in an if / else statement is enclosed within _________",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    questionInfo: "Arrays in JavaScript can be used to store ________",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    questionInfo:
      "String values must be enclosed within ________ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    questionInfo:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];
///time header
var viewHighScores = function (view) {
  view.preventDefault();
  clearInterval(clock);
  pageContentEl("#time").innerHTML = 0;
  time = 60;
  score = 0;
  quizCount = 0;
  onlyDisplaySection("#highScores");
  recordsHtmlReset();
};

//Start Quiz
var startQuiz = function () {
  setQuestionData();
  onlyDisplaySection("#questArea");
  clock = setInterval(counterTimer, 1000);
};
//correct/incorrect answer message
var achievedScore = function () {
  clearTimeout(setTime);
  setTime = setTimeout(function () {
    pageContentEl("#achievedScore").classList.add("gone");
  }, 1000);
};
//calculate score
var scoreTimeAdjust = function () {
  if (
    this.innerHTML.substring(3, this.length) === questions[quizCount].answer
  ) {
    score = score + 5;
    quizCount = quizCount + 1;
    quizUpdate("Correct");
  } else {
    time = time - 10;
    quizCount = quizCount + 1;
    quizUpdate("Incorrect");
  }
};

//Enter initials
var enterInitials = function () {
  let initialsRecord = pageContentEl("#initials").value;
  //if no character selected
  if (initialsRecord === "") {
    pageContentEl("#initError p").innerHTML = "Please enter character";
    pageContentEl("#initError").classList.remove("gone", initError());
    //record initials and score
  } else {
    recordArray.push({
      initialRecord: initialsRecord,
      score: score,
    });
    //localStore initials and high score
    localStorage.setItem("recordArray", JSON.stringify(recordArray));
    pageContentEl("#highScores div").innerHTML = "";
    onlyDisplaySection("#highScores");
    recordsHtmlReset();
    pageContentEl("#initials").value = "";
  }
};
//quiz score value
var scoreTimeAdjust = function () {
  if (
    this.innerHTML.substring(3, this.length) === questions[quizCount].answer
  ) {
    score = score + 5;
    quizCount = quizCount + 1;
    quizUpdate("Correct");
    //quiz incorrect score time penalty
  } else {
    time = time - 10;
    quizCount = quizCount + 1;
    quizUpdate("Incorrect");
  }
};
//creal high score
var clearHighScores = function () {
  recordArray = [];
  pageContentEl("#highScores div").innerHTML = "";
  localStorage.removeItem("recordArray");
};
var recordsHtmlReset = function () {
  pageContentEl("#highScores div").innerHTML = "";
  let i = 1;
  recordArray.sort((a, b) => b.score - a.score);
  Array.from(recordArray).forEach((check) => {
    var scores = document.createElement("div");
    scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
    pageContentEl("#highScores div").appendChild(scores);
    i = i + 1;
  });
  i = 0;
  Array.from(answers).forEach((answer) => {
    answer.classList.remove("disable");
  });
};

//reset quiz
var quizReset = function () {
  time = 60;
  score = 0;
  quizCount = 0;
  onlyDisplaySection("#criteriaPage");
};

localStorage.getItem("recordArray")
  ? (recordArray = JSON.parse(localStorage.getItem("recordArray")))
  : (recordArray = []);
Array.from(answers).forEach((check) => {
  check.addEventListener("click", scoreTimeAdjust);
});

// Event Listeners

pageContentEl("#criteriaPage button").addEventListener("click", startQuiz);
pageContentEl("#goBack").addEventListener("click", quizReset);
pageContentEl("#name button").addEventListener("click", enterInitials);
pageContentEl("#clearScore").addEventListener("click", clearHighScores);
pageContentEl("#scores").addEventListener("click", viewHighScores);
