/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 100;
const enemiesArray = [];

const enemyImage= new Image();
enemyImage.src = 'enemy1.png';

let gameFrame = 0;

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 -2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        //width and height is changed so that image is not stretched
        this.width = this.spriteWidth/2.5
        this.height = this.spriteHeight/2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += this.speed;
        this.y += this.speed;
        //moves to next frame only if loop is divisible by flapSpeed
        if (gameFrame % this.flapSpeed === 0) {
            //if frame = 4 then frame = 0, else frame++
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

//populate enemyArray
for(let i=0; i<numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();