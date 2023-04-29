var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

var level = 0;
function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.round(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("level " + level);
 
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); 
})

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
         setTimeout(function() {nextSequence();}, 1000);}
  }

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 200);
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started=false;
}





function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}







