//CONSTANTS
var player;
const GRAVITY = 0.1;
var platforms = [];
var PLATFORM_Y_POSITION = 600;
const GRAVITY_REDUCTION_CONST = 0.001;
const NUM_PLATFORMS_GENERATED = 1000;
//Devin reminder: GRAVITY_REDUCTION_CONST and NUM_PLATFORMS_GENERATED are inversely proportional!
const canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
const screenHeight = 800;
const screenWidth = 600;
var startingPlatform;
const BOUNCE_PAD_BASE = 30; 
const BOUNCE_PAD_HEIGHT = 10;
var running = true;
var timeElapsed = 0;
//useless stuff
var mouseX;
var mouseY;
const BOUNCE_PAD_SIZE = 12;
//const backgroundImage = document.getElementById('source');

//handle controls
function keyDown(e) {
    if(e.keyCode === 68) {
        player.xSpeed = 5;
    } else if(e.keyCode === 65) {
        player.xSpeed = -5;
    }
}
function keyUp(e) {
    if(e.keyCode === 68) {
        player.xSpeed = 0;
    } else if(e.keyCode === 65) {
        player.xSpeed = 0;
    }
}
document.onkeydown = keyDown;
document.onkeyup = keyUp;
//Render and update in here
window.onload = function() {
    if(running){
        start();
        setInterval(updateGame, 10);
    }
    if(player.ySpeed > 0){

    }
    if(!running){
        timeElapsed = 0;
        debugger;
    } 
}
class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 60;
        this.xSpeed = 0;
        this.ySpeed = 3;
    }
    show(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        //this.x += this.xSpeed
        //this.y += this.ySpeed; placed to platforms to make view follow player
        //this.ySpeed += gravity;
        this.x += this.xSpeed;
    }
}
class Platform {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 10;
        //Ensures player only bounces up upon landing on platform, not when just coming into contact with a platform
        this.ySpeed = 3;
        this.isUnder = false;
        //Removing platforms that are off screen
        this.isVisible = true;
        //bouncepad functionality
        this.bouncePadSpawnChance = Math.floor(Math.random() * 10);
        this.bouncePadXPos = this.x + Math.floor(Math.random() * 75);
        this.hasBouncePad = false;
    }
    show(){
        if(this.bouncePadSpawnChance === 3) {
            this.hasBouncePad = true;
        }
        if(this.isVisible){
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            //i typed this.hadBouncePad I couldnt find the error for so long lol
            if(this.hasBouncePad) {
                ctx.fillStyle = 'orange';
                ctx.fillRect(this.bouncePadXPos, this.y - BOUNCE_PAD_HEIGHT, BOUNCE_PAD_BASE, BOUNCE_PAD_HEIGHT);
            }
        }
    }
    update(){
        if(this.y > (screenHeight + player.height)){
            this.isVisible = false;
        }
        if(player.y < this.y - player.height){
            this.isUnder = true;
        }
        //making view follow player
        this.y -= player.ySpeed;
        player.ySpeed += (GRAVITY*GRAVITY_REDUCTION_CONST);
        //collision detection
        if(player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.y + player.height > this.y && this.isUnder && this.isVisible) {
            player.ySpeed = -7;
        }
        if(this.hasBouncePad) {
            if(player.x < this.bouncePadXPos + BOUNCE_PAD_BASE && player.x + player.width > this.bouncePadXPos && player.y < this.y && player.y + player.height > this.y - BOUNCE_PAD_HEIGHT && this.isUnder && this.isVisible) {
                player.ySpeed = -21;
            }
        }
    }
}




//Initialize everything
function start(){
    player = new Player(300, 400);
    
    startingPlatform = new Platform(300, 500);
    
    for(var i = 0; i < NUM_PLATFORMS_GENERATED; i++){
        var platform = new Platform(Math.floor(Math.random()*screenWidth), PLATFORM_Y_POSITION);
        platforms.push(platform);
        PLATFORM_Y_POSITION -= 100;
    }
    if(running){
        count();
    }
}

//updates everything in the game
function updateGame(){
    //render background
    ctx.fillStyle = '#81c4ff';
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    //ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight);
    //update player
    player.show();
    player.update();
    //show and update platforms
    for(var i = 0; i < platforms.length; i++){
        platforms[i].show();
        platforms[i].update();
    }
    
    startingPlatform.show();
    startingPlatform.update();

    //render & update counter 7/29
    ctx.fillStyle = '#555555';
    ctx.font = "30px Arial";
    ctx.fillText("Time: " + timeElapsed, 10, 50);
}

function addSecond() {timeElapsed += 1;}
function count() {setInterval(addSecond, 1000);}
