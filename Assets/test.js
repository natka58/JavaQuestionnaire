var intro = document.querySelector(".criteriapage");
var crit = document.querySelector(".quiz-criteria");
var startBtn = document.querySelector('startedBtn');
//startBtn.classList.add(".startedBtn:hover");
var timer = document.getElementById("timer");
var answers = document.querySelectorAll('#questArea button');
var time = 60;
var score = 0;
var quizCount = 0;
var recordArray = [];
var userScores = [];
var clock;
var setTime;

//page content function
var pageContentEl = function (element) {
    return document.querySelector(element);
};
//hide sections from page
var onlyDisplaySection = function (element) {
    let sections = document.querySelectorAll("section");
    Array.from(sections).forEach(function (userItem) {
        userItem.classList.add('hidden');
    });
    pageContentEl(element).classList.remove('hidden');
};
//score
var quizUpdate = function (answeCopy) {
    pageContentEl('#achievedScore p').innerHTML = answerCopy;
    pageContentEl('#achievedScore').classList.remove('gone', achievedScore());
    Array.from(answers).forEach(answer => {
        answer.classList.add('disable');
    });
    //timer
    setTimeout(function () {
        if (quizCount === questions.length) {
            onlyDisplaySection("#finish");
            time = 0;
            pageContentEl('#time').innerHTML = time;
        } else {
            setQuestionData();
            Array.from(answers).forEach(answer => {
                answer.classList.remove('disable');
            });
        }
    }, 1000);
};

var coutTimer = function () {
    if (time > 0) {
        time = time - 1;
        pageContentEl('#time').innerHTML = time;
    } else {
        clearInterval(clock);
        pageContentEl('#score').innterHTML = score;
        onlyDisplaySection("#finish");
    }
};
