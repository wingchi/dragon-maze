(function(){

  // the meat of the game
  var dragon = new gamePoint(0,2);
  var dragonElement = document.querySelector('#dragon-element');
  var fireball = new gamePoint(1,2);
  var fireballElement = document.querySelector('#fireball-element');
  var hero = new gamePoint(8,12);
  var heroElement = document.querySelector('#hero-element');
  // SETUP
  //let's layout our game screen so that it's a reasonable sized square
  var windowHeight;
  var pixelInterval;
  setupGameBoxSquare();

  function setupGameBoxSquare() {
    windowHeight = window.innerHeight;
    pixelInterval = (windowHeight - 100) / 16;
    document.querySelector('.game-box').style.height = (windowHeight - 100) + "px";
    document.querySelector('.game-box').style.width = document.querySelector('.game-box').style.height;

    resizeGameElements();
    layoutGameElements();
    startMovingParts();
  }

  function resizeGameElements() {
    var gameElements = document.querySelectorAll('.game-element');
    for (var i = 0; i < gameElements.length; i++) {
      gameElements[i].style.height = pixelInterval + "px";
      gameElements[i].style.width = pixelInterval + "px";
    }
  }

  function layoutGameElements() {
    layoutGameElement(dragonElement, dragon);
    layoutGameElement(fireballElement, fireball);
    layoutGameElement(heroElement, hero);
  }

  function layoutGameElement(element, point) {
    element.style.left = point.xPixels() + "px";
    element.style.top = point.yPixels() + "px";
  }

  function startMovingParts() {
    // move the fireball across the screen
    var fireballDirection = "forward";
    setInterval(function(){
      switch (fireballDirection) {
        case "forward":
          if (fireball.x < 15) {
            fireball.x++;
          } else {
            fireball.x--;
            fireballDirection = "backward";
          }
        break;
        case "backward":
          if (fireball.x > 1) {
            fireball.x--;
          } else {
            fireball.x++;
            fireballDirection = "forward";
          }
        break;
      }
      layoutGameElement(fireballElement, fireball);
    }, 500);
  }

  // EVENT LISTENERS
  // hide the welcome screen when the user clicks start
  document.querySelector('#game-start').onclick = function() {
    document.querySelector('#game-welcome').style.display = "none";
  }

  document.onkeypress = function(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 119: // W
        hero.y--;
      break;
      case 97: // A
        hero.x--;
      break;
      case 115: // S
        hero.y++;
      break;
      case 100: // D
        hero.x++;
      break;
    }
    layoutGameElement(heroElement, hero);
  }

  // make sure to resize the game screen whenever the window is resized
  window.addEventListener("resize", setupGameBoxSquare);

  // PROTOTYPES
  // prototype to help define our game elements
  function gamePoint(x, y) {
    this.x = x;
    this.y = y;
    this.xPixels = function() {
      return this.x * pixelInterval;
    }
    this.yPixels = function() {
      return this.y * pixelInterval;
    }
  }
})();
