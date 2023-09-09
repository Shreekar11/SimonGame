var buttomColors = ["red", "blue", "green", "yellow"];

//3. At the top of the index.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var gamePattern = [];

var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+ level);
        newSequence();
        started = true;
    }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColor = $(this).attr("id");

      //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnwer(userClickedPattern.length - 1);

    // console.log(userClickedPattern);
});

function checkAnwer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                newSequence();
              }, 1000);
        }
    }else{
        $("h1").text("Game Over !! Press a key to Start");
        animateWrong();
        // console.log("wrong");
        startOver();
    }
}

/* 
    The function newSequence will generate a new random number between 0 and 3,
    then thru the buttonColors array the random number index color will be fetched.
    Thus the button will add animate effect and sound.
*/
function newSequence(){
    userClickedPattern = [];   
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttomColors[randomNumber];
    gamePattern.push(randomColor);

    var randomColorId = "#"+randomColor;
            
    // $(randomColorId).click(function(){
        $(randomColorId).fadeIn(100).fadeOut(100).fadeIn(100);
        makeSound(randomColor);
    // });

}

// console.log(gamePattern);

function makeSound(randomColor){
    var linkName = "sounds/" + randomColor + ".mp3";
    var audio = new Audio(linkName);
    audio.play();
}

// to change the color of the button on click
function animatePress(currentColor){
    var currentColorId = "#" + currentColor;
    $(currentColorId).addClass("pressed");

    setTimeout(function(){
        $(currentColorId).removeClass("pressed");
    }, 100);
}
function animateWrong(){
    $("body").addClass("game-over");
    makeSound("wrong");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
