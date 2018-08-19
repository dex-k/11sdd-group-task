$(document).ready(function() {
    console.log("Document ready");
    //Hides elements not needed on start page
    $('.colours').hide();
    $('#guessTheColourText').hide();
    $('#submit').hide();
    $('#next').hide();
    $('#userInput').hide();
    $('#timer').hide();

    //Shows cover photo, which will be later hidden for the whole game
    $('#cover').show();

    //Adds click handlers to the 'Start Game', 'Submit', and 'Next' buttons
    $('#start').click(function() {
        oneQuestion();
        timer.start();
    });
    $('#submit').click(function() {
        timer.stop();
        checker();
    });
    $('#next').click(function() {
        oneQuestion();
        timer.reset();
    });
});

//Defining some global variables so that all functions can access them
var colourArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var score = 0;
var questionNumber = 0;
var correctColour; 

//Timer functions
var timer = {
    timeLeft: 5,
    start: function() {
        document.getElementById("time").innerHTML = timer.timeLeft;
        countdown = setInterval( function() {
            if (timer.timeLeft > 0) {
                timer.timeLeft = Math.round((timer.timeLeft - 0.1)*10)/10;
                document.getElementById("time").innerHTML = timer.timeLeft;
            } else {
                timer.end()
            }
        }, 100)
    },
    stop: function() {
        clearInterval(countdown);
    },
    end: function() {
        clearInterval(countdown);
        timeUp();
    },
    reset: function() {
        clearInterval(countdown);
        timer.timeLeft = 5;
        timer.start();
    }
}


//When either 'start game' or 'next' button is pressed, this function is run
var oneQuestion = function () {
    
    //Shows timer
    $('#timer').show();

    //Removes the message
    document.getElementById("message").innerHTML = '';

    //Hides certain elements
    $('.colours').hide();
    $('#next').hide();
    $('#start').hide();

    //Displays certain elements
    $('#guessTheColourText').show();
    $('#submit').show();
    $('#userInput').show();

    // console.log('Generating Colour');

    var randomNumber = Math.floor(Math.random() * 7);

    //Selects a colour from the colourArray, using randomNumber as an index
    correctColour = colourArray[randomNumber];

    // console.log(correctColour);

    //Displays a certain colour image based on what the correctColour variable is assigned to
    switch(correctColour) {
        case 'red':
            $('#red').show();
        break;

        case 'orange':
            $('#orange').show();
        break;
          
        case 'yellow':
            $('#yellow').show();
        break;

        case 'green':
            $('#green').show();
        break;

        case 'blue':
            $('#blue').show();
        break;

        case 'indigo':
            $('#indigo').show();
        break;

        case 'violet':
            $('#violet').show();
        break;
    };
};

//When submit button is pressed, this function runs
var checker = function() {

    //Hides the userInput box for aesthetic
    //Hides the submit box, so that users cannot click the button multiple times to add to their score
    $('#submit').hide();
    $('#userInput').hide();

    var userInput = $('#userInput').val().toLowerCase();

    //console.log(userInput);

    //Checking if the user's input is the same as the actual colour
    //Adds one to the score if correct, an adds one to the question number regardless
    //Outputs whether or not the user got it right, and outputs their current score
    if (userInput == correctColour) {
        score ++;
        document.getElementById("message").innerHTML = 'Nice - well done!';
    }
    else {
        document.getElementById("message").innerHTML = 'Not quite - its actually ' + correctColour;
    }
    
    questionNumber ++;
    document.getElementById("score").innerHTML = 'Current Score : ' + score + ' / ' + questionNumber;
    $('#next').show();
    $('#userInput').val('')
}

var timeUp = function() {
    //Hides the userInput box for aesthetic
    //Hides the submit box, so that users cannot click the button multiple times to add to their score
    $('#submit').hide();
    $('#userInput').hide();

    questionNumber ++;

    document.getElementById("message").innerHTML = 'Too slow';
    document.getElementById("score").innerHTML = 'Current Score : ' + score + ' / ' + questionNumber;
    $('#next').show();
    $('#userInput').val('')
}

