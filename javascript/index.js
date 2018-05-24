//Variable definitions here


//Anything that changes the html/page here
$(document).ready(function() {
    console.log("Document ready");

    //sets up particle background ([id of particles div], [path of json config], [callback function])
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
    
});