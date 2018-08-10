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

// I did not code this part, but it's cool so I'm leaving it in here.
// It's a flying ufo! I found it while searching for cool animations I could try.
// I explain my understanding of the code.
function makeNewPosition(){
    
    // Take the dimentions of the window and subtract 50px.
    // This is so the ufo cannot fly to the edge of the window
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    // Set a new height and width with Math random functions for the ufo to fly to.
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    // Return those values in an array
    return [nh,nw];    
    
}


// This function is the actual animator
function animateDiv(){
    // Take the array from makeNewPosition and hold it in a var
    var newq = makeNewPosition();

    // .offset() gives the offset of the ufo from the top of the window
    // and from the left of the window
    var oldq = $('.a').offset();

    // Speed is how long the ufo takes to complete the animation in milliseconds
    // calcSpeed is a modifier
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    // var speed = 10000;
    
    // The actual animation
    // Take the div.a and move it to the new position
    $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

// This is to modify the speed so the animation is more smooth
// If the new position is right next to the old position,
// the ufo will travel slower
// If the new position is farther away, then the ufo will travel faster,
// So that they reach the new position at roughly the same time, each time.
function calcSpeed(prev, next) {
    
    // take the absolute value of the subtraction of the left offsets
    var x = Math.abs(prev[1] - next[1]);

    // take the absolute value of the subtraction of the top offsets
    var y = Math.abs(prev[0] - next[0]);
    
    // check to see if x is greater than y, if x is greater than y, return x,
    // otherwise, return y
    var greatest = x > y ? x : y;
    
    // this is the speed modifier, the larger the number, the faster the ufo goes
    var speedModifier = 0.1;

    // .ceil is the oposite of .floor, it gives the next largest integer
    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
// End flying ufo code.




$(function () {
    animateDiv();
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