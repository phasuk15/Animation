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

let gameFrame = 0;
const staggerFrame = 5;

//data for the animation images
const spriteAnimations = []
const animationStates =  [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 14,
    },
    {
        name: 'gethit',
        frames: 4,
    },
    
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    for (j=0; j<state.frames; j++) {
        let positionX = j * spritewidth;
        let positionY = index * spriteheight;
        frames.loc.push({x: positionX, y: positionY});
    }

    spriteAnimations[state.name] = frames;
    console.log(spriteAnimations);

});

//creating animation loop
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations["run"].loc.length;
    let frameX = spritewidth * position;
    let frameY = spriteAnimations["run"].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spritewidth, spriteheight, 0, 0, spritewidth, spriteheight);


    gameFrame++;
    requestAnimationFrame(animate);
};

animate();