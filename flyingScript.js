/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy4.png'
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        //width and height is changed so that image is not stretched
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width);
            this.newY = Math.random() * (canvas.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        this.dx = this.x - this.newX;
        this.dy = this.y - this.newY;
        this.x -= this.dx/20;
        this.y -= this.dy/20;
        // this.x = 0;
        // this.y = 0;
        if (this.x + this.width < 0) this.x = canvas.width;
        //moves to next frame only if loop is divisible by flapSpeed
        if (gameFrame % this.flapSpeed === 0) {
            //if frame = 4 then frame = 0, else frame++
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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