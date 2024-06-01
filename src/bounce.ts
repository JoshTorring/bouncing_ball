const ball:HTMLElement = document.getElementById("ball")!;
const root = document.documentElement;

const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay));

const ballSize:number = 50;
const timeInterval: number = 0.1;
const timePeriod: number = timeInterval*100;

let mouseOnBall:boolean = false;
let mouseX: number = 0;
let mouseY: number = 0;
let ballSpeedY: number = 0;
let ballSpeedX:number = 0;
let mouseDown:boolean = false;
let ballBouncing: boolean = false;
let ballPosTime: PosTime[] = [];

interface PosTime {
    x: number;
    y: number;
    timestamp: number;
}

root.style.setProperty("--ballSize", `${ballSize}px`)

//document.addEventListener("mousemove", (event) => {console.log("mouse moved to: x:", event.clientX, "y:", event.clientY)});
//ball.addEventListener("mouseover", (event) => mousePos(event));

ball.addEventListener("mouseenter", (event) => {
    mouseOnBall = true;
    console.log("Mouse on ball");
})

ball.addEventListener("mouseout", (event) => {
    mouseOnBall = false;
    console.log("mouse off ball");
})

document.addEventListener("mousedown", async (event) => {
    if (mouseOnBall && !ballBouncing) {
        ball.style.cursor = "url('./grab_cursor.png'), auto"
        console.log("mouse down event");
        mouseDown = true;
        console.log("while on ball");
        while (mouseDown && !ballBouncing) {
            console.log("attempting to call ballDrag");
            await ballDrag();
        }
    }
})

document.addEventListener("mouseup", (event) => {
    console.log("mouse up event");
    ball.style.cursor = "url('./open_cursor.png'), auto"
    mouseDown = false;
    if (!ballBouncing && mouseOnBall) {
        ballBouncing = true;
        let speed = ballPosTime[9].timestamp - ballPosTime[0].timestamp;
        let xDiff = ballPosTime[9].x - ballPosTime[0].x;
        let yDiff = ballPosTime[9].y - ballPosTime[0].y;

        ballSpeedX = xDiff/timePeriod;
        ballSpeedY = yDiff/timePeriod;

        bouncingBall(mouseX, 600-mouseY, ballSpeedX, ballSpeedY);
    }
})

onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
};

const ballDrag = async () => {
    if (!ballBouncing && mouseDown) {
        console.log("ballDrag called at:", mouseX, mouseY)
        ball.style.left = `${mouseX}px`;
        ball.style.bottom = `${600-mouseY}px`;

        const posTime: PosTime = {
            x: mouseX,
            y: 600-mouseY,
            timestamp: new Date().getTime()
        };

        if (ballPosTime.length == 10) {
            ballPosTime.shift();
            ballPosTime.push(posTime);
        } else {
            ballPosTime.push(posTime);
        }


        console.log(ballPosTime);

        await sleep(timePeriod);
    }
}

const bouncingBall = async (ballX: number, ballY: number, ballSpeedX: number, ballSpeedY: number) => {

    const gravity:number = 9.81;
    const dragAir:number = 0.1;
    const dragGround: number = 1;
    const ballDampening:number = 0.8;

    let ballStopped: boolean = false;

    ball.style.bottom = `${ballY}px`;
    ball.style.left = `${ballX}px`;

    while (!ballStopped) {
        let windowWidth:number = window.innerWidth;
        if (ballX <= 0 || ballX >= windowWidth) {
            ballX *= -1;
        }

        if (ballY > (ballSize/2)) {
            ballSpeedY = changeBallSpeed(ballSpeedY, gravity);
            ballY = changeBallPos(ballSpeedY, ballY);
            if (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                ballSpeedX = changeBallSpeed(ballSpeedX, dragAir);
                ballX = changeBallPos(ballSpeedX, ballX);
            }
            
            await updateBall(ballX, ballY);
            console.log("New Ball Position:", ballX, ballY);
            console.log("New Ball Velocity:" + (Math.sqrt((Math.pow(ballSpeedX, 2)+Math.pow(ballSpeedY, 2)))).toString())
        } else if (ballY <= (ballSize/2) && ballSpeedY < -(timeInterval*15)) {
            ballSpeedY = -ballSpeedY*ballDampening
            console.log("ball bounced!")
            for (let i = 0; i < 2; i++) {
                ballSpeedY = changeBallSpeed(ballSpeedY, gravity);
                ballY = changeBallPos(ballSpeedY, ballY);
                if (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                    ballSpeedX = changeBallSpeed(ballSpeedX, dragGround);
                    ballX = changeBallPos(ballSpeedX, ballX);
                }
                await updateBall(ballX, ballY);
            }
        } else if (ballY <= (ballSize/2) && ballSpeedY >= -(timeInterval*15)) {
            ballSpeedY = 0;
            ball.style.bottom = '0px';
            updateBall(ballX, ballY);
            console.log("Ball stopped bouncing")

            if (ballSpeedX <= -timeInterval) {
                while (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                    ballSpeedX = changeBallSpeed(ballSpeedX, -dragGround);
                    ballX = changeBallPos(ballSpeedX, ballX);
                    await updateBall(ballX, ballY);
                }
            } else if (ballSpeedX >= timeInterval) {
                while (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                    ballSpeedX = changeBallSpeed(ballSpeedX, dragGround);
                    ballX = changeBallPos(ballSpeedX, ballX);
                    await updateBall(ballX, ballY);
                }
            }
            ballStopped = true;
            console.log("ball stopped moving");
            ballBouncing = false;
        }
    }
}

function changeBallSpeed (ballSpeed: number, resistance: number):number {
    console.log("new X speed:", ballSpeed)
    return ballSpeed - (resistance * timeInterval)
}

function changeBallPos (ballSpeed: number, ballPos: number):number {
    return ballPos + ballSpeed
}

const updateBall = async (ballX: number, ballY: number) => {
    ball.style.left = `${ballX}px`;
    ball.style.bottom = `${ballY}px`;
    await sleep(timePeriod);
}