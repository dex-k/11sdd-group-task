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

//Anything that changes the html/page here
$(document).ready(function() {
console.log("Document ready");
//sets up particle background ([id of particles div], [json config]
particlesJS('particles-js', particlesConfig);
console.log('particles.js loaded')

//drag and drop
var swapFluidData = function(fromID, toID) {
    console.log('swapping ' + fromID + ' with ' + toID);
  //add # to reference ID in jQuery
  let fromID = '#' + fromID;
  let toID = '#' + toID;
  //set data to variables
  let fromX = $(fromID).data('fluid-column');
  let fromY = $(fromID).data('fluid-row');
  let toX = $(toID).data('fluid-column');
  let toY = $(toID).data('fluid-row');
  //change element data
  $(toID).data('fluid-column', fromX);
    console.log('set ' + toID + ' fluid-column to ' + fromX);
  $(toID).data('fluid-row', fromY);
    console.log('set ' + toID + ' fluid-row to ' + fromY);
  $(fromID).data('fluid-column', toX);
    console.log('set ' + fromID + ' fluid-column to ' + toX);
  $(fromID).data('fluid-row', toY);
    console.log('set ' + fromID + ' fluid-row to ' + toY);
}
var drag = function(e) {
}

});