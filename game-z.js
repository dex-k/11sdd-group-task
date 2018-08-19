var particlesConfig = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#aaa"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.7,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#bbb",
        "opacity": 0.7,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
}

$(document).ready(function() {
    console.log("Document ready");
    particlesJS('particles-js', particlesConfig);
    console.log('particles-js loaded')
  
    // Initial Game Setup
    gameSetup();
    // on tile click
    $('.tile').on('click', toggle);
    // on subtile picture
    $('.pic').on('click',reload);
});

// holds all the current and starting information for game instance
var gameData = {
    newTile: true, // determines if this is the first tile selected in a pair
    firstTile: -1, // determines the first tile picture picked in a pair
    firstPicture: -1, // determines the first tile picture in a pair
    secondTile: -1, // determines the second tile picked in a pair
    secondPicture: -1, // determines the second tile picture in a pair
    pairs: {firstHalf: [], secondHalf: [], remaining: 18}, // lists the collections of pairs and the number of pairs remaining
    gameOver: false, // determins if the game is over
};

var gameSetup = function() {
  // pairs up tiles at random
    pairUp()
    for (var i = 0; i < 18; i++) {
      // asigns pictures to pairs
        $('#tile' + gameData.pairs.firstHalf[i]).css('background-image','url(\"../media/' + i + '.png\")');
        $('#tile' + gameData.pairs.secondHalf[i]).css('background-image','url(\"../media/' + i + '.png\")');
    }
    // hides all tiles
    hideAll();
    console.log(gameData)
}

var pairUp = function() {
    var picks = [];
    // defines an array of integers from 0 to 35 inclusive
    for (var i = 0; i < 36; i++) {
        picks[i] = i;
    }
    var newPick = 0;
    for (var i = 0; i < 18; i++) {
        newPick = Math.floor(Math.random() * picks.length); // chooses a random object in the array
        gameData.pairs.firstHalf[i] = picks[newPick]; // adds that object as the first part of a pair
        picks.splice(newPick,1); // removes the object from the original array
        newPick = Math.floor(Math.random() * picks.length); // chooses another random object in the array
        gameData.pairs.secondHalf[i] = picks[newPick]; // adds that object as the second part of a pair
        picks.splice(newPick,1); // removes the object from the original array
    }
}

var toggle = function(tile) {
    var tile = parseInt(tile.target.id); // collects the tile number
    if (gameData.gameOver) { // checks if the game is still running
        $('.pic').css('background-image','url(\'../media/replay.png\')'); // shows the replay button
        $('#tile' + tile).fadeIn(300);
        return;
    }
    if (isNaN(tile)) { // checks if selected tile has already been found or selected
        return;   
    }
    if (gameData.newTile) { // checks if selected tile is first tile choice
        $('#tile' + tile).show() // shows the tile
        gameData.newTile = false;
        gameData.firstTile = tile;
        gameData.firstPicture = findPictureFromTile(tile); // finds the picture associated with the current tile
    }
    else {
        $('#tile' + tile).show() // shows selected tile
        gameData.newTile = true;
        gameData.secondTile = tile;
        gameData.secondPicture = findPictureFromTile(tile);
        if (gameData.firstPicture === gameData.secondPicture) { // checks if tiles match by image
            gameData.pairs.remaining--; // ticks down the number of tiles remaining
            $('.counter').replaceWith("<div class=\'counter\'>" + (18 - gameData.pairs.remaining) + " / 18</div>"); // updates scoreboard
            if (gameData.pairs.remaining === 0) // checks if game is over
            {
                gameOver(); // ends the game
            }
                return;
        }
            $('#tile' + gameData.firstTile).fadeOut(1100); // fades tiles if not equal
            $('#tile' + gameData.secondTile).fadeOut(1100);
    }
}

var findPictureFromTile = function(tile) {
    for (var i = 0; i < 18; i++) { // loops through images and find match
        if (gameData.pairs.firstHalf[i] === tile || gameData.pairs.secondHalf[i] === tile) {
            return i;
        }
    }
}

var gameOver = function() {
    $('.tile').css('background-image','url(\'../media/success.png\')'); // applies trophy picture
    gameData.gameOver = true;
    $('.pic').fadeOut(2000); // fades the game tiles
    $('.counter').replaceWith('<div class=\'counter\'>Game Over</div>');
    $('.counter').css('font-size','3vw');
    $('.counter').hide();
    $('.counter').fadeIn(1000)
    console.log('game over')
}

var reload = function() {
  if (gameData.gameOver) {
    location.reload(); // reloads the page
  }
}

// Debug functions
//Toggles all tiles
var toggleAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).toggle()
    }
}
//Shows all tiles
var showAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).show()
    }
}
var hideAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).hide()
    }
}
