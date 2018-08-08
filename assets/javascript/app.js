var questions = [
    question1 = {
        question: "The sun is made mostly from what element?",
        answers: ["Hydrogen", "Helium", "Nitrogen", "Oxygen"],
        answer: "Hydrogen",
        img: "http://via.placeholder.com/300?text=Placeholder.com+rocks!"
    },

    question2 = {
        question: "What is the process that 'powers' stars?",
        answers: ["Quantum tunneling", "Nuclear fission", "Nuclear fusion", "Coronal mass ejections"],
        answer: "Nuclear fusion",
        img: "http://via.placeholder.com/300?text=Placeholder.com+rocks!"
    },

    quesiton3 = {
        question: "Most stars, when plotted into a graph of color and brightness, fall into a band known as the ...",
        answers: ["Main sequence", "Zenith pattern", "Lagrangian point", "Galaxy rotation curve"],
        answer: "Main sequence",
        img: "http://via.placeholder.com/300?text=Placeholder.com+rocks!"
    },

    question4 = {
        question: "The final stage for the most massive stars is either a massive explosion known as a supernova or gravitational collapse into a ...",
        answers: ["Black hole", "Nebula", "Red giant", "White dwarf"],
        answer: "Black hole",
        img: "http://via.placeholder.com/300?text=Placeholder.com+rocks!"
    }
]

var correct = 0;
var wrong = 0;
var question = '';
var index = 0;
var time = 30;
var playing = true;
var tick;

function newGame() {
    playing = true;
    timer();
    time = 30;
    correct = 0;
    wrong = 0;
    question = '';
    index = 0;
    nextQuestion();
}

function nextQuestion() {
    timer();
    if (index === questions.length) {
        endScreen();
        return;
    }
    question = questions[index].question;
    answers = questions[index].answers;
    answer = questions[index].answer;
    $("#question").html(question);
    $("#answers").html(
        "<p class='answer' id='answer1'></p>" +
        "<p class='answer' id='answer2'></p>" +
        "<p class='answer' id='answer3'></p>" +
        "<p class='answer' id='answer4'></p>");
    $("#answer1").text(answers[0]);
    $("#answer2").text(answers[1]);
    $("#answer3").text(answers[2]);
    $("#answer4").text(answers[3]);
    index++;
}

function timer() {
    clearInterval(tick);
    time = 30;
    if (playing) {
        tick = setInterval(function () {
            time--;
            $("#timer").text("Time left: " + time + " seconds.");
            if (time === 0) {
                wrongAnswer();
                clearInterval(tick);
            }
        }, 1000);
    } else {
        clearInterval(tick);
    }
}

function correctAnswer() {
    correct++;
    $("#question").text("Nice! You chose the correct answer!");
    $("#answers").html("<img src='https://cdn.dribbble.com/users/904380/screenshots/2233565/revised-google-logo.gif' width='300px'>");
    clearInterval(tick);
    setTimeout(nextQuestion, 3000);
}

function wrongAnswer() {
    wrong++;
    $("#question").text("You were wrong. The correct answer is: " + answer);
    $("#answers").html("<img src='https://cdn.dribbble.com/users/904380/screenshots/2233565/revised-google-logo.gif' width='300px'>");
    clearInterval(tick);
    setTimeout(nextQuestion, 1000);
}

function endScreen() {
    clearInterval(tick);
    playing = false;
    $("#question").text("Game over");
    $("#answers").html(
        "<p class='answer' id='answer1'></p>" +
        "<p class='answer' id='answer2'></p>" +
        "<p class='answer' id='answer3'></p>" +
        "<p class='answer' id='reset'></p>");
    $("#answer1").html("<p>Total questions: " + questions.length + "</p>");
    $("#answer2").html("<p>Answers correct: " + correct + "</p>");
    $("#answer3").html("<p>Answers wrong: " + wrong + "</p>");
    $("#reset").append("<button type='button' id='restart'>Click to play again.</button>");
}

$(function () {
    newGame();
    $(document).on("click", "#restart", function () {
        newGame();
    });

    $(document).on("click", "#answer1", function () {
        if (playing) {
            var choice = $(this).text();
            if (choice === answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        }
    });

    $(document).on("click", "#answer2", function () {
        if (playing) {
            var choice = $(this).text();
            if (choice === answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        }
    });

    $(document).on("click", "#answer3", function () {
        if (playing) {
            var choice = $(this).text();
            if (choice === answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        }
    });

    $(document).on("click", "#answer4", function () {
        if (playing) {
            var choice = $(this).text();
            if (choice === answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        }
    });

});