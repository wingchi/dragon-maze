(function(){

  // the meat of the game
  var gameSpeed = 50; // the lower the faster the fireball moves

  var dragon = new gamePoint(0,4);
  var dragonElement = document.querySelector('#dragon-element');
  var fireball = new gamePoint(1,4);
  var fireballElement = document.querySelector('#fireball-element');
  var fireballAnimation;
  var hero = new gamePoint(8,12);
  var heroElement = document.querySelector('#hero-element');
  var treasure = new gamePoint(14,1);
  var treasureElement = document.querySelector('#treasure-element');
  // SETUP
  //let's layout our game screen so that it's a reasonable sized square
  var windowHeight;
  var pixelInterval;

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
    layoutGameElement(treasureElement, treasure);
  }

  function layoutGameElement(element, point) {
    element.style.left = point.xPixels() + "px";
    element.style.top = point.yPixels() + "px";
  }

  function startMovingParts() {
    // move the fireball across the screen
    var fireballDirection = "forward";
    fireballAnimation = setInterval(function(){
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
      checkForCollisions();
    }, gameSpeed);
  }

  function checkForCollisions() {
    // if the hero and the fireball collide then the hero dies
    if (hero.x === fireball.x && hero.y === fireball.y) {
      alert("X__X YOU DIED! GAME OVER!");
      clearInterval(fireballAnimation);
    }

    // if the hero gets to the treasure then the hero wins
    if (hero.x === treasure.x && hero.y === treasure.y) {
      alert("YOU GOT THE TREASURE! YOU WIN!");
      treasure.x = -1;
      treasure.y = -1;
      layoutGameElement(treasureElement, treasure);
    }
  }

  // EVENT LISTENERS
  // hide the welcome screen when the user clicks start
  document.querySelector('#game-start').onclick = function() {
    setupGameBoxSquare();
    document.querySelector('#game-welcome').style.display = "none";
  }

  document.onkeypress = function(event) {
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
    checkForCollisions();
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
