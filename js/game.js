/********************** Variables ***********************/

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;
/********************** Random Number Function ***********************/

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

/********************** Animate Function ***********************/

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/********************** Answer Function ***********************/

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");
  }
}

/********************** Restart Function ***********************/

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

/********************** Click Function ***********************/

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

})

/********************** Key Function ***********************/

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})

/********************** Player Function ***********************/

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}