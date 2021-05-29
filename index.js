var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPatter = [];
var level = -1;
var gameStarted = false;

$(document).keypress(function(){
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("." + randomChoosenColor).animate({opacity : 0.1},"fast").animate({opacity : 1},"fast");

    playSound(randomChoosenColor);
    level++;
    $(".title").text("Level " + level);
}
    
$("button").click(function(event){
    var classes = $(this).attr("class");
    var identifier = classes.substring(0,classes.indexOf(' '))
    animatePress(this);
    userClickedPatter.push(identifier)
    if(checkAnswer()){
        playSound(identifier);
        if(gamePattern.length === userClickedPatter.length){
            userClickedPatter = [];
            setTimeout(function(){
                nextSequence();
            },200);
        }
        
    }else{
        $('body').addClass("wrong");
        setTimeout(function(){
            $('body').removeClass("wrong");
        },50);
        playSound("wrong");
        userClickedPatter = [];
        gamePattern = [];
        gameStarted = false;
        level = -1;
        $(".title").text("Game Over press a key to start the game");
    }
});

function playSound(fileName){
    var audio = new Audio("sounds/" + fileName + ".mp3");
    audio.play();
}

function animatePress(element){
    $(element).addClass("pressed");
    setTimeout(function(){
        $(element).removeClass("pressed");
    },100) 
}

function checkAnswer(){
    if(userClickedPatter[userClickedPatter.length-1] != gamePattern[userClickedPatter.length-1]){
        return false;
    }
    return true;
}



    
