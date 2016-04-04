// the meat of the game
var gameSpeed = 100; // the lower the faster the fireball moves

var hero = new gamePoint(8,12);
var heroElement = document.querySelector('#hero-element');

(function(){

  function layoutGameElements() {
    layoutGameElement(heroElement, hero);
  }

  function startMovingParts() {
    // move the fireball across the screen
  }

  function checkForCollisions() {
    // if the hero and the fireball collide then the hero dies

    // if the hero gets to the treasure then the hero wins

  }

  // EVENT LISTENERS
  // hide the welcome screen when the user clicks start
  // document.querySelector('#id').onclick = function() {}

  // move the hero using WASD
  // keycodes are 119, 97, 115, 100, respectively
  // document.onkeypress = function(event) {}

  // change game element positions based on window size
  // window.addEventListener("resize", myFunction);
})();
