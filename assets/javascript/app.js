var questions = [
    question1 = {
        question: "The sun is made mostly from what element?",
        answers: ["Hydrogen", "Helium", "Nitrogen", "Oxygen"],
        answer: "Hydrogen",
        img: "assets/images/hydrogen.png"
    },

    question2 = {
        question: "What is the process that 'powers' stars?",
        answers: ["Quantum tunneling", "Nuclear fission", "Coronal mass ejections", "Nuclear fusion"],
        answer: "Nuclear fusion",
        img: "assets/images/fusion.png"
    },

    quesiton3 = {
        question: "Most stars, when plotted into a graph of color and brightness, fall into a band known as the ...",
        answers: ["Main sequence", "Zenith pattern", "Lagrangian point", "Galaxy rotation curve"],
        answer: "Main sequence",
        img: "assets/images/mainsequence.png"
    },

    question4 = {
        question: "The final stage for the most massive stars is either a massive explosion known as a supernova or gravitational collapse into a ...",
        answers: ["Nebula", "Red giant", "White dwarf", "Black hole"],
        answer: "Black hole",
        img: "assets/images/blackhole.png"
    },

    question5 = {
        question: "The Kepler space telescope has found more what than any other telescope?",
        answers: ["Exoplanets", "Quasars", "Asteroids", "Nebulas"],
        answer: "Exoplanets",
        img: "assets/images/exoplanet.png"
    },

    question6 = {
        question: "Variances in the Sun's magnetic field can cause some areas on the Sun's surface to be slightly cooler than the surrounding area. These areas are known as what?",
        answers: ["Convergent voids", "Sunspots", "Dipolar radiance", "Solar wind"],
        answer: "Sunspots",
        img: "assets/images/sunspot.png"
    },

    question7 = {
        question: "A planet that does not orbit any star, instead wandering through the galaxy alone, is called what?",
        answers: ["A rogue planet", "A templar", "A planetar", "A dwarf planet"],
        answer: "A rogue planet",
        img: "assets/images/rogueplanet.png"
    },

    question8 = {
        question: "What is the stellar equivalent of a rogue planet?",
        answers: ["White hole", "Brown dwarf", "Intergalatic star", "Protostar"],
        answer: "Intergalatic star",
        img: "assets/images/intergalacticstar.png"
    },

    question9 = {
        question: "Molecular clouds are regions where interstellar gases are slightly more dense, permitting molecules to form. These massive clouds can also give birth to what?",
        answers: ["Dark matter", "Ionized gas", "Galaxies", "Stars"],
        answer: "Stars",
        img: "assets/images/stars.png"
    },

    question10 = {
        question: "What was the first (and so far only) spacecraft to enter the interstellar medium?",
        answers: ["Hubble", "Voyager I", "Cassini", "Venera 9"],
        answer: "Voyager I",
        img: "assets/images/voyageri.png"

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
        "<button type='button' class='answer choice' id='answer1'></button> <br>" +
        "<button type='button' class='answer choice' id='answer2'></button> <br>" +
        "<button type='button' class='answer choice' id='answer3'></button> <br>" +
        "<button type='button' class='answer' id='answer4'></button> <br>");
    $("#answer1").text(answers[0]);
    $("#answer2").text(answers[1]);
    $("#answer3").text(answers[2]);
    $("#answer4").text(answers[3]);
    index++;
}

function timer() {
    clearInterval(tick);
    time = 30;
    $("#timer").text("Time left: " + time + " seconds.");
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
    $("#answers").html("<img src=" + questions[index - 1].img + " width='300px'>");
    clearInterval(tick);
    setTimeout(nextQuestion, 5000);
}

function wrongAnswer() {
    wrong++;
    $("#question").text("You were wrong. The correct answer is: " + answer);
    $("#answers").html("<img src=" + questions[index - 1].img + " width='300px'>");
    clearInterval(tick);
    setTimeout(nextQuestion, 5000);
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
    $("#start").on("click", function () {
        newGame();
        $(this).html("<span id='start' style='display: none'></span>");
    });

    $(document).on("click", "#restart", function () {
        newGame();
    });

    $(document).on("click", ".choice", function () {
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