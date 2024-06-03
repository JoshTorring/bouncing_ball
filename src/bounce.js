var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var ball = document.getElementById("ball");
var root = document.documentElement;
var sleep = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var ballSize = 50;
var timeInterval = 0.1;
var timePeriod = timeInterval * 100;
var mouseOnBall = false;
var mouseX = 0;
var mouseY = 0;
var ballSpeedY = 0;
var ballSpeedX = 0;
var mouseDown = false;
var ballBouncing = false;
var ballPosTime = [];
root.style.setProperty("--ballSize", "".concat(ballSize, "px"));
ball.addEventListener("mouseenter", function (event) {
    mouseOnBall = true;
    console.log("Mouse on ball");
});
ball.addEventListener("mouseout", function (event) {
    mouseOnBall = false;
    console.log("mouse off ball");
});
document.addEventListener("mousedown", function (event) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(mouseOnBall && !ballBouncing)) return [3 /*break*/, 3];
                ball.style.cursor = "url('./grab_cursor.png'), auto";
                console.log("mouse down event");
                mouseDown = true;
                console.log("while on ball");
                _a.label = 1;
            case 1:
                if (!(mouseDown && !ballBouncing)) return [3 /*break*/, 3];
                return [4 /*yield*/, ballDrag()];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); });
document.addEventListener("mouseup", function (event) {
    console.log("mouse up event");
    ball.style.cursor = "url('./open_cursor.png'), auto";
    mouseDown = false;
    if (!ballBouncing && mouseOnBall) {
        ballBouncing = true;
        var speed = ballPosTime[9].timestamp - ballPosTime[0].timestamp;
        var xDiff = ballPosTime[9].x - ballPosTime[0].x;
        var yDiff = ballPosTime[9].y - ballPosTime[0].y;
        ballSpeedX = xDiff / speed * 8;
        ballSpeedY = yDiff / speed * 8;
        bouncingBall(mouseX, 600 - mouseY, ballSpeedX, ballSpeedY);
    }
});
onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
var ballDrag = function () { return __awaiter(_this, void 0, void 0, function () {
    var posTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(!ballBouncing && mouseDown)) return [3 /*break*/, 2];
                ball.style.left = "".concat(mouseX, "px");
                ball.style.bottom = "".concat(600 - mouseY, "px");
                posTime = {
                    x: mouseX,
                    y: 600 - mouseY,
                    timestamp: new Date().getTime()
                };
                if (ballPosTime.length == 10) {
                    ballPosTime.shift();
                    ballPosTime.push(posTime);
                }
                else {
                    ballPosTime.push(posTime);
                }
                return [4 /*yield*/, sleep(timePeriod)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var bouncingBall = function (ballX, ballY, ballSpeedX, ballSpeedY) { return __awaiter(_this, void 0, void 0, function () {
    var gravity, dragAir, dragGround, ballDampening, ballStopped, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gravity = 9.81;
                dragAir = 0.1;
                dragGround = 1;
                ballDampening = 0.9;
                ballStopped = false;
                ball.style.bottom = "".concat(ballY, "px");
                ball.style.left = "".concat(ballX, "px");
                _a.label = 1;
            case 1:
                if (!!ballStopped) return [3 /*break*/, 13];
                if (!(ballY > (ballSize / 2))) return [3 /*break*/, 3];
                ballSpeedY = changeBallSpeed(ballSpeedY, gravity, 'y', 0);
                ballY = changeBallPos(ballSpeedY, ballY);
                if (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                    ballSpeedX = changeBallSpeed(ballSpeedX, dragAir, 'x', ballX);
                    ballX = changeBallPos(ballSpeedX, ballX);
                }
                return [4 /*yield*/, updateBall(ballX, ballY)];
            case 2:
                _a.sent();
                return [3 /*break*/, 12];
            case 3:
                if (!(ballY <= (ballSize / 2) && ballSpeedY < -(timeInterval * 15))) return [3 /*break*/, 8];
                ballSpeedY = -ballSpeedY * ballDampening;
                console.log("ball bounced!");
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < 2)) return [3 /*break*/, 7];
                ballSpeedY = changeBallSpeed(ballSpeedY, gravity, 'y', 0);
                ballY = changeBallPos(ballSpeedY, ballY);
                if (ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval) {
                    ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, 'x', ballX);
                    ballX = changeBallPos(ballSpeedX, ballX);
                }
                return [4 /*yield*/, updateBall(ballX, ballY)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 12];
            case 8:
                if (!(ballY <= (ballSize / 2) && ballSpeedY >= -(timeInterval * 15))) return [3 /*break*/, 12];
                ballSpeedY = 0;
                ball.style.bottom = '0px';
                updateBall(ballX, ballY);
                console.log("Ball stopped bouncing");
                _a.label = 9;
            case 9:
                if (!(ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval)) return [3 /*break*/, 11];
                ballSpeedX = changeBallSpeed(ballSpeedX, dragGround, 'x', ballX);
                ballX = changeBallPos(ballSpeedX, ballX);
                return [4 /*yield*/, updateBall(ballX)];
            case 10:
                _a.sent();
                return [3 /*break*/, 9];
            case 11:
                ballStopped = true;
                console.log("ball stopped moving");
                ballBouncing = false;
                _a.label = 12;
            case 12: return [3 /*break*/, 1];
            case 13: return [2 /*return*/];
        }
    });
}); };
function changeBallSpeed(ballSpeed, resistance, vector, ballPos) {
    var windowWidth = window.innerWidth;
    if (vector == 'x') {
        console.log("new X speed:", ballSpeed);
    }
    if (ballPos <= 0 + (ballSize / 2) && vector == 'x') {
        console.log("changed direction from - to +");
        mouseX = (1 + (ballSize / 2));
        updateBall(1 + (ballSize / 2));
        return ballSpeed = (ballSpeed * -1) - (resistance * timeInterval);
    }
    else if (ballPos >= windowWidth - (ballSize / 2) && vector == 'x') {
        console.log("changed direction from + to -");
        mouseX = (windowWidth - (ballSize / 2) - 1);
        updateBall(windowWidth - (ballSize / 2) - 1);
        return ballSpeed = (ballSpeed * -1) + (resistance * timeInterval);
    }
    if (ballSpeed <= 0 && vector == 'x') {
        return ballSpeed - (-resistance * timeInterval);
    }
    else {
        return ballSpeed - (resistance * timeInterval);
    }
}
function changeBallPos(ballSpeed, ballPos) {
    return ballPos + ballSpeed;
}
var updateBall = function (ballX, ballY) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ball.style.left = "".concat(ballX, "px");
                if (!ballY) return [3 /*break*/, 2];
                ball.style.bottom = "".concat(ballY, "px");
                return [4 /*yield*/, sleep(timePeriod)];
            case 1:
                _a.sent();
                console.log("checking x+y");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, sleep(timePeriod * 1)];
            case 3:
                _a.sent();
                console.log("only checking x");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
