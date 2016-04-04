// the meat of the game
var gameSpeed = 100; // the lower the faster the fireball moves
var playerLives = 3; // the number of lives the hero has

var dragon = new gamePoint(0,4);
var dragonElement = document.querySelector('#dragon-element');
var fireball = new gamePoint(1,4);
var fireballElement = document.querySelector('#fireball-element');
var hero = new gamePoint(8,12);
var heroElement = document.querySelector('#hero-element');
var treasure = new gamePoint(14,1);
var treasureElement = document.querySelector('#treasure-element');

(function(){
  var fireballAnimation;
  var gameover = false;

  function layoutGameElements() {
    layoutGameElement(dragonElement, dragon);
    layoutGameElement(fireballElement, fireball);
    layoutGameElement(heroElement, hero);
    layoutGameElement(treasureElement, treasure);
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
    if (!gameover && ((hero.x === fireball.x && hero.y === fireball.y) ||
      (hero.x === dragon.x && hero.y === dragon.y))) {
      alert("X__X OUCH!");
      playerLives--;
      document.querySelector('#player-lives').innerHTML = getPlayerLivesText(playerLives);

      // move the hero backward
      hero.y++;
      layoutGameElement(heroElement, hero);

      if (playerLives <= 0) {
        alert("GAME OVER!");
        gameover = true;
        clearInterval(fireballAnimation);
      }
    }


    // if the hero gets to the treasure then the hero wins
    if (!gameover && hero.x === treasure.x && hero.y === treasure.y) {
      alert("YOU GOT THE TREASURE! YOU WIN!");
      treasure.x = -1;
      treasure.y = -1;
      layoutGameElement(treasureElement, treasure);
      treasureElement.style.display = "none";
      gameover = true;
    }
  }

  // EVENT LISTENERS
  // hide the welcome screen when the user clicks start
  document.querySelector('#game-start').onclick = function() {
    var playerName = document.querySelector('#player-name-input').value;
    document.querySelector('#player-name').innerHTML = playerName;

    document.querySelector('#player-lives').innerHTML = getPlayerLivesText(playerLives);

    layoutGameElements();
    startMovingParts();
    document.querySelector('#game-welcome').style.display = "none";
  }

  document.onkeypress = function(event) {
    switch (event.keyCode) {
      case 119: // W
        if (hero.y - 1 >= 0) {
          hero.y--;
        }
      break;
      case 97: // A
        if (hero.x - 1 >= 0) {
          hero.x--;
        }
      break;
      case 115: // S
        if (hero.y + 1 <= 15) {
          hero.y++;
        }
      break;
      case 100: // D
        if (hero.x + 1 <= 15) {
          hero.x++;
        }
      break;
    }

    layoutGameElement(heroElement, hero);
    checkForCollisions();
  }

  // change game element positions based on window size
  window.addEventListener("resize", layoutGameElements);
})();
