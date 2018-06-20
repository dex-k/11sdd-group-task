// Particles stuff
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


//drag and drop
//fromID and toID are strings without leading #
var swapFluidData = function(fromID, toID) {
    console.log('swapping fluid data of ' + fromID + ' with ' + toID);
  
  //set data to variables
  let fromX = $('#' + fromID).attr('data-fluid-column');
  let fromY = $('#' + fromID).attr('data-fluid-row');
  let toX = $('#' + toID).attr('data-fluid-column');
  let toY = $('#' + toID).attr('data-fluid-row');
  
  //change element data
  $('#' + toID).attr('data-fluid-column', fromX);
    // console.log('set ' + toID + ' fluid-column to ' + fromX);
  $('#' + toID).attr('data-fluid-row', fromY);
    // console.log('set ' + toID + ' fluid-row to ' + fromY);
  $('#' + fromID).attr('data-fluid-column', toX);
    // console.log('set ' + fromID + ' fluid-column to ' + toX);
  $('#' + fromID).attr('data-fluid-row', toY);
    // console.log('set ' + fromID + ' fluid-row to ' + toY);
;}

//fromID and toID are strings without leading #
var swapID = function(firstID, secondID) {
    console.log('swapping ID\'s of ' + firstID + ' and ' + secondID);
  $('#' + secondID).attr('id', '');
    // console.log('removed ID of ' + secondID)
  $('#' + firstID).attr('id', secondID);
    // console.log('set ID of ' + firstID + ' to ' + secondID)
  $('#' + secondID).attr('id', firstID);
  // console.log('set ID of ' + secondID + ' to ' + firstID)
}

var swapTiles = function(fromTile, toTile) {
  swapFluidData(fromTile, toTile);
  swapID(fromTile, toTile);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
var shuffleArray = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

var scramble = function() {
  //ordered array of all tiles
  var fromIDArray = ['a1', 'a2', 'a3', 'a4', 'a5',
                   'b1', 'b2', 'b3', 'b4', 'b5',
                   'c1', 'c2', 'c3', 'c4', 'c5',
                   'd1', 'd2', 'd3', 'd4', 'd5',
                   'e1', 'e2', 'e3', 'e4', 'e5'];
  //copy the ordered array
  var toIDArray = ['a1', 'a2', 'a3', 'a4', 'a5',
                   'b1', 'b2', 'b3', 'b4', 'b5',
                   'c1', 'c2', 'c3', 'c4', 'c5',
                   'd1', 'd2', 'd3', 'd4', 'd5',
                   'e1', 'e2', 'e3', 'e4', 'e5'];
    console.log(toIDArray);
  //randomise the second array
  shuffleArray(toIDArray);
    console.log(toIDArray);
  //set each tile in the first array to the tile in the second
  //i.e. randomise the order
  for (i = 0; i < fromIDArray.length; i++) {
    swapTiles(fromIDArray[i], toIDArray[i]);
  }
};

//drag and drop functions/variables
var dragTiles = document.getElementsByClassName("picture-tile");
var allowDrop = function(e) {
  e.preventDefault();
}
var drag = function(e) {
    console.log('drag start ' + e)
  e.dataTransfer.setData('text', e.target.id)
}
var drop = function(e) {
    console.log('drop' + e);
  var draggedID = e.dataTransfer.getData("text");
  var droppedID = e.target.id;
  console.log("dragged: " + draggedID + ", dropped: " + droppedID);
}
//Anything that changes the html/page here
$(document).ready(function() {
  console.log("Document ready");

  //sets up particle background ([id of particles div], [json config]
  particlesJS('particles-js', particlesConfig);
  console.log('particles.js loaded')
  
  $('.picture-tile').on("dragstart", drag())
                    .on("dragover", allowDrop())
                    .on("drop", drop());
});