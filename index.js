let gamePattern = [];

let userPattern = [];

let buttonColor = ["red", "green", "yellow", "blue"];

let started = false;

let level = 0;

$(document).keypress(function () {
    if (!started) {
        $(".title").text("Level " + level);
        nextSequance();
        started = true;
    }
})


function nextSequance() {
    userPattern = [];
    level++;
    $(".title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

function checkSequance(index) {
    if (gamePattern[index] === userPattern[index]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nextSequance();
            }, 1000);
        }
    } else {
        $(".title").addClass("game-over");
        $(".title").text("Game over Press any key to restart!");
        setTimeout(function () {
            $(".title").removeClass("game-over");
        }, 200);
        restart();
    }

}

$(".button").click(function () {
    let clickId = this.id;
    userPattern.push(clickId);
    if (started === true) {
        animate(clickId);
        playSound(clickId);
    }
    checkSequance(userPattern.length - 1);
})


function animate(name) {
    $("#" + name).addClass("press");
    setTimeout(function () {
        $("#" + name).removeClass("press");
    }, 100)
}

function playSound(name) {
    let newSound = new Audio("Sounds/" + name + ".mp3");
    newSound.play();
}

function restart() {
    gamePattern = [];
    started = false;
    level = 0;
}