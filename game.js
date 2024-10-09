var started = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("LEVEL" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).delay(100).fadeOut().fadeIn("slow");
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}
function playSound(name) {
switch (name) {
    case "blue":
        var blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
        break;
        
        case "green":
        var greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
        break;

        case "red":
        var redSound = new Audio("sounds/red.mp3");
        redSound.play();
        break;

        case "yellow":
        var yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
        break;

}
}

$(".btn").click(function() {
   var userChosenColour = $(this).attr("Id");
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour) {
   $(".btn#" + currentColour).addClass("pressed");
   
   setTimeout(function() {
    $(".btn#" + currentColour).removeClass("pressed");
}, 100)
}

$(document).keydown(function() {
    if (!started) {

    $("#level-title").text("LEVEL" + level);
    nextSequence();
    started = true;
    
    }
});

function checkAnswer(currentLevel) {
 if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
        nextSequence();
    }, 1000); 
}
 } else {

    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");

    setTimeout(function() {
    $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");    
    startOver();
 }
}
function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}