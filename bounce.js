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
var sleep = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var mouseOnBall = false;
var mouseX = 0;
var mouseY = 0;
var mouseDown = false;
//document.addEventListener("mousemove", (event) => {console.log("mouse moved to: x:", event.clientX, "y:", event.clientY)});
//ball.addEventListener("mouseover", (event) => mousePos(event));
ball.addEventListener("mouseenter", function (event) {
    mouseOnBall = true;
});
ball.addEventListener("mouseout", function (event) {
    mouseOnBall = false;
});
ball.addEventListener("mousedown", function (event) {
    ball.style.cursor = "url('./grab_cursor.png'), auto";
    if (mouseOnBall) {
        while (mouseDown) {
            ballDrag();
        }
    }
});
ball.addEventListener("mouseup", function (event) {
    ball.style.cursor = "url('./open_cursor.png'), auto";
    mouseDown = false;
});
onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
function ballDrag() {
}
var bouncingBall = function () { return __awaiter(_this, void 0, void 0, function () {
    var gravity, dragAir, dragGround, ballDampening, timeInterval, timePeriod, ballMomentum, ballSpeedY, ballSpeedX, ballX, ballY, ballStopped, j;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gravity = 9.81;
                dragAir = 0.1;
                dragGround = 1;
                ballDampening = 0.8;
                timeInterval = 0.1;
                timePeriod = timeInterval * 100;
                ballMomentum = 0;
                ballSpeedY = 0;
                ballSpeedX = 5;
                ballX = 100;
                ballY = 300;
                ballStopped = false;
                ball.style.bottom = "".concat(ballY, "px");
                ball.style.left = "".concat(ballX, "px");
                ball.style.display = 'none';
                return [4 /*yield*/, sleep(1000)];
            case 1:
                _a.sent();
                ball.style.display = 'block';
                _a.label = 2;
            case 2:
                if (!!ballStopped) return [3 /*break*/, 13];
                if (!(ballY > 0)) return [3 /*break*/, 4];
                ballMoveY(ballY, ballSpeedY, gravity, timeInterval);
                ballMoveX(ballX, ballSpeedX, dragAir, timeInterval);
                return [4 /*yield*/, sleep(timePeriod)];
            case 3:
                _a.sent();
                return [3 /*break*/, 12];
            case 4:
                if (!(ballY <= 0 && ballSpeedY < -(timeInterval * 15))) return [3 /*break*/, 7];
                ballSpeedY = -ballSpeedY * ballDampening;
                console.log("ball bounced!");
                ballMoveY(ballY, ballSpeedY, gravity, timeInterval);
                ballMoveX(ballX, ballSpeedX, dragGround, timeInterval);
                return [4 /*yield*/, sleep(timePeriod)];
            case 5:
                _a.sent();
                ballMoveY(ballY, ballSpeedY, gravity, timeInterval);
                ballMoveX(ballX, ballSpeedX, dragGround, timeInterval);
                return [4 /*yield*/, sleep(timePeriod)];
            case 6:
                _a.sent();
                return [3 /*break*/, 12];
            case 7:
                if (!(ballY <= 0 && ballSpeedY >= -(timeInterval * 15))) return [3 /*break*/, 12];
                ballSpeedY = 0;
                ball.style.bottom = '0px';
                return [4 /*yield*/, sleep(timePeriod)];
            case 8:
                _a.sent();
                for (j = 0; j < 20; j++) {
                    console.log("Ball stopped Bouncing");
                }
                _a.label = 9;
            case 9:
                if (!(ballSpeedX <= -timeInterval || ballSpeedX >= timeInterval)) return [3 /*break*/, 11];
                ballMoveX(ballX, ballSpeedX, dragGround, timeInterval);
                return [4 /*yield*/, sleep(timePeriod)];
            case 10:
                _a.sent();
                return [3 /*break*/, 9];
            case 11:
                ballStopped = true;
                console.log("ball stopped!");
                _a.label = 12;
            case 12: return [3 /*break*/, 2];
            case 13: return [2 /*return*/];
        }
    });
}); };
function ballMoveY(ballY, ballSpeedY, gravity, timeInterval) {
    ballSpeedY = ballSpeedY - (gravity * timeInterval);
    ballY = ballY + ballSpeedY;
    ball.style.bottom = "".concat(ballY, "px");
    console.log("ball Y speed:", ballSpeedY);
    console.log("ball moved to:", ballY);
}
function ballMoveX(ballX, ballSpeedX, drag, timeInterval) {
    if (ballSpeedX < -timeInterval || ballSpeedX > timeInterval) {
        ballSpeedX = ballSpeedX - (drag * timeInterval);
        ballX = ballX + ballSpeedX;
        ball.style.left = "".concat(ballX, "px");
        console.log("ball X speed:", ballSpeedX);
        console.log("ball moved to:", ballX);
    }
}
bouncingBall();
