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


const bouncingBall = async () => {

    const gravity:number = 9.81;
    const dragAir:number = 0.1;
    const dragGround: number = 1;
    const ballDampening:number = 0.8;
    const timeInterval: number = 0.1;
    const timePeriod: number = timeInterval*100;

    let ballSpeedY: number = 0;
    let ballSpeedX:number = 5;
    let ballX:number = 100;
    let ballY: number = 300;
    let ballStopped: boolean = false;

    ball.style.bottom = `${ballY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.display = 'none';

    await sleep(1000);
    ball.style.display = 'block';
    while (!ballStopped) {
        if (ballY > 0) {
            ballSpeedY = changeBallSpeed(ballSpeedY, gravity, timeInterval);
            ballY = changeBallPos(ballSpeedY, ballY);
            ballSpeedX = changeBallSpeed(ballSpeedX, dragAir, timeInterval);
            ballX = changeBallPos(ballSpeedX, ballX);
            await sleep(timePeriod);
        } else if (ballY <= 0 && ballSpeedY < -(timeInterval*15)) {
            ballSpeedY = -ballSpeedY*ballDampening
            console.log("ball bounced!")
            for (let i = 0; i < 2; i++) {
                ballSpeedY = changeBallSpeed(ballSpeedY, gravity, timeInterval);
                ballY = changeBallPos(ballSpeedY, ballY);
                ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, timeInterval);
                ballX = changeBallPos(ballSpeedX, ballX);
                await sleep(timePeriod);
            }
        } else if (ballY <= 0 && ballSpeedY >= -(timeInterval*15)) {
            ballSpeedY = 0;
            ball.style.bottom = '0px';
            await sleep(timePeriod);
            for (let j = 0; j < 20; j++) {
                console.log("Ball stopped Bouncing")
            }
            while (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, timeInterval);
                ballX = changeBallPos(ballSpeedX, ballX);
                await sleep(timePeriod);
            }
            ballStopped = true;
            console.log("ball stopped!")
        }
    }
}

function ballMoveY(ballY: number, ballSpeedY: number, gravity: number, timeInterval: number):void {
    ballSpeedY = ballSpeedY - (gravity * timeInterval);
    ballY = ballY + ballSpeedY;
    ball.style.bottom = `${ballY}px`
    console.log("ball Y speed:", ballSpeedY);
    console.log("ball moved to:", ballY);
}

function changeBallSpeed (ballSpeed: number, resistance: number, timeInterval: number):number {
    return ballSpeed - (resistance * timeInterval)
}

function changeBallPos (ballSpeed: number, ballPos: number):number {
    return ballPos + ballSpeed
}

function ballMoveX(ballX: number, ballSpeedX: number, drag: number, timeInterval: number):void {
    if (ballSpeedX < -timeInterval || ballSpeedX > timeInterval) {
        ballSpeedX = ballSpeedX - (drag * timeInterval);
        ballX = ballX + ballSpeedX;
        ball.style.left = `${ballX}px`
        console.log("ball X speed:", ballSpeedX);
        console.log("ball moved to:", ballX);
    }
}


bouncingBall();