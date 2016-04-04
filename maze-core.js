(function(){
  var windowHeight;
  var pixelInterval;

  setupGameBoxSquare();
  resizeGameElements();

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

  // SETUP FUNCTIONS
  // let's layout our game screen so that it's a reasonable sized square
  function setupGameBoxSquare() {
    windowHeight = window.innerHeight;
    pixelInterval = (windowHeight - 100) / 16;
    document.querySelector('.game-box').style.height = (windowHeight - 100) + "px";
    document.querySelector('.game-box').style.width = document.querySelector('.game-box').style.height;
  }

  function resizeGameElements() {
    var gameElements = document.querySelectorAll('.game-element');
    for (var i = 0; i < gameElements.length; i++) {
      gameElements[i].style.height = pixelInterval + "px";
      gameElements[i].style.width = pixelInterval + "px";
    }
  }

  // LAYOUT

  function layoutGameElement(element, point) {
    element.style.left = point.xPixels() + "px";
    element.style.top = point.yPixels() + "px";
  }

  // STRING FORMATTING

  function getPlayerLivesText(lives) {
    var livesHTML = "";
    for (var i = 0; i < lives; i++) {
      livesHTML += "&hearts;"
    }
    return livesHTML;
  }

  // EVENT LISTENERS
  // make sure to resize the game screen whenever the window is resized
  window.addEventListener("resize", setupGameBoxSquare);
  window.addEventListener("resize", resizeGameElements);

  // public functions and variables
  window.gamePoint = gamePoint;
  window.layoutGameElement = layoutGameElement;
  window.getPlayerLivesText = getPlayerLivesText;
})();
