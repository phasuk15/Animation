const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//global variables
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGTH = canvas.height = 600;

//bringing in image
const playerImage = new Image();
playerImage.src = "shadow_dog.png";
//image of one sprite
const spritewidth = 575;
const spriteheight = 523;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrame = 3;

//creating animation loop
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    //ctx.fillRect(50, 50, 100, 100);
    ctx.drawImage(playerImage, frameX*spritewidth, frameY*spriteheight, spritewidth, spriteheight, 0, 0, spritewidth, spriteheight);

    if (gameFrame % staggerFrame == 0) {
        if (frameX < 6) frameX++;
        else frameX = 0;
    }

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();