const ball:HTMLElement = document.getElementById("ball")!;

const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay));

let mouseOnBall:boolean = false;
let mouseX: number = 0;
let mouseY: number = 0;
let mouseDown:boolean = false;

//document.addEventListener("mousemove", (event) => {console.log("mouse moved to: x:", event.clientX, "y:", event.clientY)});
//ball.addEventListener("mouseover", (event) => mousePos(event));

ball.addEventListener("mouseenter", (event) => {
    mouseOnBall = true;
})

ball.addEventListener("mouseout", (event) => {
    mouseOnBall = false
})

ball.addEventListener("mousedown", (event) => {
    ball.style.cursor = "url('./grab_cursor.png'), auto"
    if (mouseOnBall) {
        while (mouseDown) {
            ballDrag();
        }
    }
})

ball.addEventListener("mouseup", (event) => {
    ball.style.cursor = "url('./open_cursor.png'), auto"
    mouseDown = false;
})

onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
};

function ballDrag () {
    
}


function bouncingBall () {

    const gravity:number = 9.81;
    const dragAir:number = 0.1;
    const dragGround: number = 1;
    const ballDampening:number = 0.8;
    const timeInterval: number = 0.2;
    const timePeriod: number = timeInterval*100;

    let ballSpeedY: number = 0;
    let ballSpeedX:number = 5;
    let ballX:number = 100;
    let ballY: number = 300;
    let ballStopped: boolean = false;

    ball.style.bottom = `${ballY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.display = 'none';

    updateBall(ballX, ballY, timePeriod);
    ball.style.display = 'block';
    while (!ballStopped) {
        if (ballY > 0) {
            ballSpeedY = changeBallSpeed(ballSpeedY, gravity, timeInterval);
            ballY = changeBallPos(ballSpeedY, ballY);
            ballSpeedX = changeBallSpeed(ballSpeedX, dragAir, timeInterval);
            ballX = changeBallPos(ballSpeedX, ballX);
            updateBall(ballX, ballY, timePeriod);
            console.log("New Ball Position:", ballX, ballY);
            console.log("New Ball Velocity:" + (Math.sqrt((Math.pow(ballSpeedX, 2)+Math.pow(ballSpeedY, 2)))).toString())
        } else if (ballY <= 0 && ballSpeedY < -(timeInterval*15)) {
            ballSpeedY = -ballSpeedY*ballDampening
            console.log("ball bounced!")
            for (let i = 0; i < 2; i++) {
                ballSpeedY = changeBallSpeed(ballSpeedY, gravity, timeInterval);
                ballY = changeBallPos(ballSpeedY, ballY);
                ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, timeInterval);
                ballX = changeBallPos(ballSpeedX, ballX);
                updateBall(ballX, ballY, timePeriod);
            }
        } else if (ballY <= 0 && ballSpeedY >= -(timeInterval*15)) {
            ballSpeedY = 0;
            ball.style.bottom = '0px';
            updateBall(ballX, ballY, timePeriod);
            console.log("Ball stopped bouncing")

            while (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, timeInterval);
                ballX = changeBallPos(ballSpeedX, ballX);
                updateBall(ballX, ballY, timePeriod);
            }
            ballStopped = true;
            console.log("ball stopped moving")
        }
    }
}

function changeBallSpeed (ballSpeed: number, resistance: number, timeInterval: number):number {
    return ballSpeed - (resistance * timeInterval)
}

function changeBallPos (ballSpeed: number, ballPos: number):number {
    return ballPos + ballSpeed
}

const updateBall = async (ballX: number, ballY: number, timePeriod: number) => {

    ball.style.left = `${ballX}px`;
    ball.style.bottom = `${ballY}px`;

    await sleep(timePeriod);
}

bouncingBall();