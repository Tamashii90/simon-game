
var buttons = ["green", "red", "yellow", "blue"];
var guess = [];
var pressed = [];
var errorSound = new Audio("./sounds/wrong.mp3");





$("#level-title").click(function () {              
    gameStart(nextSequence());               // Start the game after clicking the title
    $("#level-title").off();                // Remove all event handlers on the title as they aren't needed anymore
    $(".btn").click(function () {
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
        guess.push($(this).attr("id"));         // Add the button to array of guessed buttons
        playSound($(this).attr("id"));
        if (pressed[guess.length - 1] === guess[guess.length - 1]) {            // Check if guessed element is right
            if (guess.length === pressed.length) {                      // Check if user clicked all buttons in sequence
                console.log("YEAAAAAAAAH");
                guess = [];                       // This is so the user has to rightly guess all buttons from beginning
                setTimeout(() => gameStart(nextSequence()), 600);
            }
        }
        else {
            $("body").css("backgroundColor", "red");
            errorSound.play();
            $("#level-title").css("marginLeft", "7%");
            $("#level-title").text("GAME OVER !! Restarting..");
            setTimeout(() => location.reload(), 1200);
        }
    })
});


function nextSequence() {
    return Math.floor(Math.random() * 4);
}

function gameStart(buttonIndex) {

    pressed.push(buttons[buttonIndex]);
   
    for (let i = 1; i <= pressed.length; i++) {    // i HAS to be let not var. This loops goes through all buttons the user should click
        setTimeout(() => {
            playSound(pressed[i-1]);    
            $("#level-title").text("Level " + pressed.length);
            $($(".btn")[buttons.indexOf(pressed[i-1])]).css("opacity", "0");
            setTimeout(function () {
                $($(".btn")[buttons.indexOf(pressed[i-1])]).css("opacity", "1");
            }, 200);
        }, i * 400);
    }
}

function playSound(fileName) {
    var sound = new Audio("./sounds/" + fileName + ".mp3");
    sound.play();
}

