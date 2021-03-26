
  

document.addEventListener("DOMContentLoaded", function (event) {
    var fieldWidth = 500;
    var fieldHeight = 500;
    var fieldOne = 25;
    var score = 0;
    var count = 0;
    

    window.addEventListener('resize', orientFun, false);
    function orientFun(EO) {
        EO = EO || window.event;
        var boxContent = document.getElementById('box-content');
        var canvas = document.getElementById('canvas1');
        var screenHeight = window.innerHeight;
        boxContent.style.width = screenHeight - 20 + 'px';
        boxContent.style.height = canvas.offsetWidth + 'px';
        boxContent.style.margin = 10 + 'px';

    }
    setInterval(function () {
        orientFun();
    }, 100);


    var canvas = document.getElementById('canvas1');
    canvas.setAttribute('width', fieldWidth);
    canvas.setAttribute('height', fieldHeight);
    var context = canvas.getContext('2d');

    var fenceImgUp = new Image();
    fenceImgUp.src = 'image/fence.svg';

    var fenceImgDown = new Image();
    fenceImgDown.src = 'image/barbed-wire.svg';

    var fenceUp = {
        posX: fieldOne * 5,
        posY: fieldOne * 3
    };
    var fenceDown = {
        posX: fieldOne * 5,
        posY: fieldOne * 19
    };
    var barbedCount=0;

    var snakeHead = new Image();
    snakeHead.src = 'image/snakeHead.svg';

    var snakeTail = new Image();
    snakeTail.src = 'image/snakeTail.svg';

    var smallerTail = new Image();
    smallerTail.src = 'image/smallerTail.svg';

    var smallTail = new Image();
    smallTail.src = 'image/smallTail.svg';

    var smallxTail = new Image();
    smallxTail.src = 'image/smallxTail.svg';

    var heart = new Image();
    heart.src = 'image/heart.png';

    var emptyheart = new Image();
    emptyheart.src = 'image/emptyheart.png';

    var redHeartImg = new Image();
    redHeartImg.src = 'image/redheart.svg';

    var redheart = {
        posX: fieldOne * 10,//out of field
        posY: fieldOne
    };

    var foodImg = new Image();
    function randomDiap(n, m) {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }

    var eatAudio = new Audio();
    eatAudio.src = "audio/eatAudio.mp3";

    var mouseAudio = new Audio();
    mouseAudio.src = "audio/rat2.wav";

    var eatTailAudio = new Audio();
    eatTailAudio.src = "audio/eatTailAudio.mp3";

    var slowHeart = new Audio();
    slowHeart.src = 'audio/slowheart.wav';

    var click = new Audio();
    click.src = 'audio/click.wav';

    function vibro(longFlag) {
        if (navigator.vibrate) { // есть поддержка Vibration API?
            if (!longFlag)
                window.navigator.vibrate(100); // вибрация 100мс
            else
                window.navigator.vibrate([100, 50, 100, 50, 100]); // вибрация 3 раза по 100мс с паузами 50мс
        }
    }

    var buttonAudio = document.getElementById('button-audio');
    buttonAudio.addEventListener('click', funAudio);

    function funAudio(EO) {
        EO = EO || window.event;
        if (!(document.getElementById('audio-off').classList.contains('done'))) {
            click.play();
        }
        var audioOn = document.getElementById('audio-on');
        var audioOff = document.getElementById('audio-off');

        if (audioOn.classList.contains('done')) {
            audioOn.classList.remove('done');
            audioOff.classList.remove('done');
            console.log('on');
            eatAudio.src = "audio/eatAudio.mp3";
            eatTailAudio.src = "audio/eatTailAudio.mp3";
            slowHeart.src = 'audio/slowheart.wav';

        } else {
            audioOn.classList.add('done');
            audioOff.classList.add('done');
            console.log('off');
            eatAudio.src = "";
            eatTailAudio.src = "";
            slowHeart.src = "";

        }

    }

    var buttonFood = document.getElementById('button-food');
    buttonFood.addEventListener('click', funChangeFood);

    function funChangeFood(EO) {
        EO = EO || window.event;
        if (!(document.getElementById('audio-off').classList.contains('done'))) {
            click.play();
        }
        var fastFood = document.getElementById('fast-food');
        var veganFood = document.getElementById('vegan-food');

        if (fastFood.classList.contains('done')) {
            fastFood.classList.remove('done');
            veganFood.classList.remove('done');

            eatAudio.src = "audio/eatAudio.mp3";
            foodImg.src = foodSrc();
        } else {
            fastFood.classList.add('done');
            veganFood.classList.add('done');

            eatAudio.src = "audio/eatAudio.mp3";
            foodImg.src = foodSrc();

        }
    }

    var mouseImg=new  Image();
    mouseImg.src='image/rat-right.png';
    var mouse={
            posX:fieldOne*3,
            posY:fieldOne*7,
            speedX:fieldOne,
            speedY:0
        };
        function directionMouse() {
            var numbers = [];
            var zero=0;
            var speed=fieldOne;
            numbers = ['',[zero,speed],[-speed,zero],[zero,speed],[-speed,zero],[zero,-speed],[-speed,zero]];
            
            n = randomDiap(1, 6);
            number = numbers[n];
            return number;
        }
var mousecount=10;


    function foodSrc() {
        var links = [];
        if (!document.getElementById('fast-food').classList.contains('done')) {
            links = ['', 'image/pizza.png', 'image/burger.png', 'image/hot-dog.png', 'image/french-fries.png', 'image/bigPizza.png', 'image/kebab.png', 'image/nuggets.png', 'image/turkey.png', 'image/fried-chicken.png'];
        } else {
            links = ['', 'image/apple.png', 'image/broccoli.png', 'image/carrot.png', 'image/bananas.png', 'image/tomato.png', 'image/cucumber.png', 'image/potato.png', 'image/strawberry.png', 'image/water-bottle.png'];
        }
        n = randomDiap(1, 9);
        src = links[n];
        return src;
    }
    foodImg.src = foodSrc();
    var food = {
        posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
        posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne

    };


    var snake = [];
    snake[0] = {
        posX: fieldWidth / 2,
        posY: fieldHeight / 2,
    };

    var buttonRestart = document.getElementById('button-restart');
    buttonRestart.addEventListener('click', funClickRestart);
    buttonRestart.addEventListener('touchend', funClickRestart);
    var gameOver = document.getElementById('game-over');

    function funClickRestart(EO) {
        EO = EO || window.event;
        if (!(document.getElementById('audio-off').classList.contains('done'))) {
            click.play();
        }
        move = '';
        gameOver.classList.remove('done');
        score = 0;
        count = 0;
        locCount = 0;
        milsec = 50;
        snake = [];
        snake[0] = {
            posX: fieldWidth / 2,
            posY: fieldHeight / 2,

        };
        mouse={
            posX:fieldOne*3,
            posY:fieldOne*7,
            speedX:fieldOne,
            speedY:0
        };
        setTimeout(function () {
            document.getElementById('press-swipe').classList.remove('done');
        }, 500);
        swipe.speedX = 1;
        swipe.speedY = 1;
        redheart = {
            posX: fieldOne * 10,//out of field
            posY: fieldOne
        };
        draw();
    }

    var buttonExit = document.getElementById('button-exit');
    buttonExit.addEventListener('click', funClose);
    buttonExit.addEventListener('touchend', funClose);
    function funClose(EO) {

        EO = EO || window.event;
        if (!(document.getElementById('audio-off').classList.contains('done'))) {
            click.play();
        }
        startgame=false;
        var gameOver = document.getElementById('game-over');

        gameOver.classList.remove('done');
        document.getElementById('loader').classList.remove('done');
        document.getElementById('cntue').classList.remove('done');
        funClickRestart();
    }
    var home = document.getElementById('home');
    home.addEventListener('click', funHome);

    function funHome(EO) {
        EO = EO || window.event;
        document.getElementById('boxPause').classList.remove('done');
        funClose();
    }

    var buttonPauseRestart = document.getElementById('button-pause-restart');
    buttonPauseRestart.addEventListener('click', funPauseRestart);

    function funPauseRestart(EO) {
        EO = EO || window.event;
        funClickRestart();
        document.getElementById('boxPause').classList.remove('done');
    }

    document.addEventListener('keydown', snakeMove, false);

    var playStart=document.getElementById('cntue');
    playStart.addEventListener('click',funPlayStart);
    var move;
    var startgame;

    function funPlayStart(EO){
        EO=EO||window.event;
        startgame=true;
    }

    
    function snakeMove(EO) {
        EO = EO || window.event;
       if(startgame){
        if (EO.keyCode == 37 && move != 'right') {
            move = 'left';
            snakeHead.src = 'image/snakeHeadLeft.svg';
        }
        else if (EO.keyCode == 38 && move != 'down') {
            move = 'up';
            snakeHead.src = 'image/snakeHead.svg';
        }
        else if (EO.keyCode == 39 && move != 'left') {
            move = 'right';
            snakeHead.src = 'image/snakeHeadRight.svg';
        }
        else if (EO.keyCode == 40 && move != 'up') {
            move = 'down';
            snakeHead.src = 'image/snakeHeadDown.svg';
        }
       }
        if (move)

            document.getElementById('press-swipe').classList.add('done');


    }

    // swipe--------------------------------

    var box = document.getElementById('box');
    box.addEventListener('touchstart', funTouchStart, false);

    function funTouchStart(EO) {
        EO = EO || window.event;
        EO.preventDefault();
        var touchInfoStart = EO.targetTouches[0];
        var touchXs = touchInfoStart.pageX;
        var touchYs = touchInfoStart.pageY;

        box.addEventListener('touchmove', funTouchMove, false);

        function funTouchMove(EO) {
            EO = EO || window.event;
            EO.preventDefault();
            box.addEventListener('touchend', funTouchEnd, false);
            var touchInfoMove = EO.targetTouches[0];
            var touchX1 = touchInfoMove.pageX;
            var touchY1 = touchInfoMove.pageY;
            function funTouchEnd(EO) {
                EO = EO || window.event;
                EO.preventDefault();
                var touchXm = touchX1;
                var touchYm = touchY1;

                var minSwipe = 20;

                if (touchXs > touchXm && touchXs - touchXm >= minSwipe) {
                    if (Math.abs(touchXs - touchXm) > Math.abs(touchYs - touchYm) &&
                        move != 'right') {
                        move = 'left';
                        snakeHead.src = 'image/snakeHeadLeft.svg';
                    }
                }
                else if (touchYs > touchYm && touchYs - touchYm >= minSwipe) {
                    if (Math.abs(touchYs - touchYm) > Math.abs(touchXs - touchXm) &&
                        move != 'down') {
                        move = 'up';
                        snakeHead.src = 'image/snakeHead.svg';
                    }
                }
                else if (touchXs < touchXm && touchXm - touchXs >= minSwipe) {
                    if (Math.abs(touchXs - touchXm) > Math.abs(touchYs - touchYm) &&
                        move != 'left') {
                        move = 'right';
                        snakeHead.src = 'image/snakeHeadRight.svg';
                    }
                }
                else if (touchYs < touchYm && touchYm - touchYs >= minSwipe) {
                    if (Math.abs(touchYm - touchYs) > Math.abs(touchXm - touchXs) &&
                        move != 'up') {
                        move = 'down';
                        snakeHead.src = 'image/snakeHeadDown.svg';
                    }
                }
                box.removeEventListener('touchmove', funTouchMove, false);
                box.removeEventListener('touchend', funTouchEnd, false);
                if (move) {
                    swipe.speedX = 0;
                    swipe.speedY = 0;
                    document.getElementById('press-swipe').classList.add('done');
                }
            }

        }

    }

    var leftGM = document.getElementById('left');
    var upGM = document.getElementById('up');
    var rightGM = document.getElementById('right');
    var downGM = document.getElementById('down');
    leftGM.addEventListener('click', funLeftGM);
    upGM.addEventListener('click', funUpGM);
    rightGM.addEventListener('click', funRightGM);
    downGM.addEventListener('click', funDownGM);

    function funLeftGM(EO) {
        EO = EO || window.event;
        if (move !== 'right') {
            move = 'left';
            snakeHead.src = 'image/snakeHeadLeft.svg';
        }
        if (move)
            swipe.speedX = 0;
        swipe.speedY = 0;
        document.getElementById('press-swipe').classList.add('done');

    }
    function funUpGM(EO) {
        EO = EO || window.event;
        if (move !== 'down') {
            move = 'up';
            snakeHead.src = 'image/snakeHead.svg';
        }
        if (move)
            swipe.speedX = 0;
        swipe.speedY = 0;
        document.getElementById('press-swipe').classList.add('done');

    }
    function funRightGM(EO) {
        EO = EO || window.event;
        if (move !== 'left') {
            move = 'right';
            snakeHead.src = 'image/snakeHeadRight.svg';
        }
        if (move)
            swipe.speedX = 0;
        swipe.speedY = 0;
        document.getElementById('press-swipe').classList.add('done');

    }
    function funDownGM(EO) {
        EO = EO || window.event;
        if (move !== 'up') {
            move = 'down';
            snakeHead.src = 'image/snakeHeadDown.svg';
        }
        if (move)
            swipe.speedX = 0;
        swipe.speedY = 0;
        document.getElementById('press-swipe').classList.add('done');

    }

    var milsec = 50;
    locCount = 0;
    document.getElementById('cntue').onclick = function () {
        move = '';
        swipe.speedX = 1;
        swipe.speedY = 1;
        document.getElementById('press-swipe').classList.remove('done');
    };
  
  draw();  

    function draw() {
       
        var stopGame = setTimeout(draw, 150);
        orientFun();

        for (let i = 0; i < fieldWidth; i = i + fieldOne) {
            for (let k = 0; k < fieldHeight; k = k + fieldOne) {
                context.fillStyle = 'rgb(37, 109, 37)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }
        for (let i = fieldOne; i < fieldWidth; i = i + fieldOne * 2) {
            for (let k = fieldOne; k < fieldHeight; k = k + fieldOne * 2) {
                context.fillStyle = 'rgb(15, 97, 15)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }
        for (let i = 0; i < fieldWidth; i = i + fieldOne * 2) {
            for (let k = 0; k < fieldHeight; k = k + fieldOne * 2) {
                context.fillStyle = 'rgb(15, 97, 15)';
                context.fillRect(i, k, fieldOne, fieldOne);
            }
        }




        context.fillStyle = 'rgb(37, 109, 37)';
        context.fillRect(0, 0, fieldWidth, fieldOne * 3);

        context.beginPath();
        context.moveTo(2, fieldOne * 3);
        context.lineTo(fieldWidth - 2, fieldOne * 3);
        context.lineTo(fieldWidth - 2, fieldHeight - 2);
        context.lineTo(2, fieldHeight - 2);
        context.closePath();
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = 'black';
        context.font = 'italic bold 40px Arial';
        context.fillText('Score: ' + score, 25, fieldOne + fieldOne / 2);
        context.textAlign = 'left';
        context.textBaseline = 'middle';


        if (count >= 3) {
            clearTimeout(stopGame);
            setTimeout(function () {
                gameOver.classList.add('done');
            }, 500);

            var fieldNik = document.getElementById('field-nik');
            fieldNik.addEventListener('touchend', funFocusInput);
            fieldNik.addEventListener('click', funFocusInput);
            function funFocusInput(EO) {
                if (!(document.getElementById('audio-off').classList.contains('done'))) {
                    click.play();
                }
                fieldNik.focus();
                fieldNik.placeholder = 'your name..';
            }

        }

        context.drawImage(foodImg, food.posX, food.posY);


        context.drawImage(mouseImg, mouse.posX, mouse.posY);
    
        if(mousecount==10){
            mousecount=0;
        var zs=directionMouse();
        mouse.speedX=zs[0];
        mouse.speedY=zs[1]; 
        }
        if(mouse.speedX==fieldOne && mouse.speedY==0){
            mouseImg.src='image/rat-right.png';
        }else if(mouse.speedX==-fieldOne && mouse.speedY==0){
            mouseImg.src='image/rat-left.png';
        }else if(mouse.speedX==0 && mouse.speedY==fieldOne){
            mouseImg.src='image/rat-down.png';
        }else if(mouse.speedX==0 && mouse.speedY==-fieldOne){
            mouseImg.src='image/rat-up.png';
        }

        if(move){
        mousecount++;
        mouse.posX+=mouse.speedX;
        mouse.posY+=mouse.speedY;
        }
        
       


        if ((score > 10 && count == 1) || (score > 20 && count == 2)) {
            locCount++;
            if (locCount == 1) {
                redheart = {
                    posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
                    posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne
                };
            }

            if (milsec > 0) {
                milsec--;
                context.fillStyle = 'black';
                context.font = 'italic bold 40px Arial';
                context.fillText(milsec, fieldOne * 10, fieldOne + fieldOne / 2);
                context.textAlign = 'left';
                context.textBaseline = 'middle';
            } else {
                redheart.posX = fieldOne * 10;
                redheart.posY = fieldOne;
                locCount = 0;
            }
        }
        context.drawImage(redHeartImg, redheart.posX, redheart.posY);


        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                context.drawImage(snakeHead, snake[i].posX, snake[i].posY);
            }
            else if (i == snake.length - 1) {
                context.drawImage(smallxTail, snake[i].posX + 7.5, snake[i].posY + 7.5);
            } else if (i == snake.length - 2) {
                context.drawImage(smallTail, snake[i].posX + 5, snake[i].posY + 5);
            }
            else if (i == snake.length - 3) {
                context.drawImage(smallerTail, snake[i].posX + 2.5, snake[i].posY + 2.5);
            }
            else if (i > 0 && i < snake.length - 1) {
                context.drawImage(snakeTail, snake[i].posX + 1.5, snake[i].posY + 1.5);
            }

        }


        var snakeX = snake[0].posX;
        var snakeY = snake[0].posY;

        

        
        
    
        


        snake.pop();

        if (move == 'left') {
            snakeX -= fieldOne;
        }
        if (move == 'right') {
            snakeX += fieldOne;
        }
        if (move == 'up') {
            snakeY -= fieldOne;
        }
        if (move == 'down') {
            snakeY += fieldOne;
        }

        if ((snakeY > (fieldHeight - fieldOne)) &&
            (snakeX > fieldOne * 4 && snakeX < fieldOne * 15)) {
            snakeY = fieldHeight - fieldOne;
            count = 3;
        }
        if ((snakeY < fieldOne * 3) &&
            (snakeX > fieldOne * 4 && snakeX < fieldOne * 15)) {
            snakeY = fieldOne * 3;
            count = 3;
        }

        if (snakeX < 0) {
            snakeX = (fieldWidth - fieldOne);
        }
        if (snakeX > (fieldWidth - fieldOne)) {
            snakeX = 0;
        }
        if (snakeY < fieldOne * 3) {
            snakeY = fieldHeight - fieldOne;
        }
        if (snakeY > fieldHeight - fieldOne) {
            snakeY = fieldOne * 3;
        }

        if (mouse.posX < 0) {
            mouse.posX = 0;
            mouse.speedX=fieldOne;
        }
        if (mouse.posX > (fieldWidth - fieldOne)) {
            mouse.posX = fieldWidth-fieldOne;
            mouse.speedX=-fieldOne;
        }
        if (mouse.posY < fieldOne * 3) {
            mouse.posY = fieldOne*3;
            mouse.speedY=fieldOne;
        }
        if (mouse.posY > fieldHeight - fieldOne) {
            mouse.posY = fieldHeight - fieldOne;
            mouse.speedY=-fieldOne;
        }

      



        var newHead = {
            posX: snakeX,
            posY: snakeY
        };

        count = eatTail(newHead, snake);
        if (count <= 0) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 3, fieldOne);

        } else if (count == 1) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(heart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);

        } else if (count == 2) {
            context.drawImage(heart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
        } else if (count == 3) {
            context.drawImage(emptyheart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
        } else if (count > 3) {
            context.drawImage(emptyheart, fieldWidth - fieldOne * 7, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 5, fieldOne);
            context.drawImage(emptyheart, fieldWidth - fieldOne * 3, fieldOne);
        }
        if (count == 2 || count >= 3) {
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(2, fieldOne * 3);
            context.lineTo(fieldWidth - 2, fieldOne * 3);
            context.lineTo(fieldWidth - 2, fieldHeight - 2);
            context.lineTo(2, fieldHeight - 2);
            context.closePath();
            context.lineWidth = 2;
            context.stroke();
        }
        if (count < 2) {
            context.strokeStyle = 'black';
            context.beginPath();
            context.moveTo(2, fieldOne * 3);
            context.lineTo(fieldWidth - 2, fieldOne * 3);
            context.lineTo(fieldWidth - 2, fieldHeight - 2);
            context.lineTo(2, fieldHeight - 2);
            context.closePath();
            context.lineWidth = 2;
            context.stroke();
        }
        snake.unshift(newHead);
        if (food.posX == redheart.posX && food.posY == redheart.posY) {
            foodImg.src = foodSrc();
            food = {
                posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
                posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne
            };
        }
        if (snakeX == food.posX && snakeY == food.posY) {
            eatAudio.play();
            score++;
            foodImg.src = foodSrc();
            food = {
                posX: Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne,
                posY: Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne
            };
            snake.unshift(newHead);
        }
        if((snakeX == mouse.posX && snakeY == mouse.posY) ||
        (mouse.speedX==fieldOne && move=='left' && snakeX == mouse.posX-fieldOne && snakeY == mouse.posY)||
        (mouse.speedX==-fieldOne && move=='right' && snakeX == mouse.posX+fieldOne && snakeY == mouse.posY)||
        (mouse.speedY==fieldOne && move=='up' && snakeX == mouse.posX && snakeY == mouse.posY-fieldOne) ||
        (mouse.speedY==-fieldOne && move=='down' && snakeX == mouse.posX && snakeY == mouse.posY+fieldOne)){
            mouseAudio.play();
            score+=5;            
            mouse.posX=Math.floor((Math.random() * ((fieldWidth - fieldOne) / fieldOne))) * fieldOne;
            mouse.posY=Math.floor((Math.random() * ((fieldHeight - fieldOne * 3) / fieldOne) + 3)) * fieldOne;
            snake.unshift(newHead);
        }
        if(((snakeX>=fenceUp.posX && snakeX<=fenceUp.posX+fieldOne*9) &&
        (snakeY==fenceUp.posY)) || ((snakeX>=fenceDown.posX && snakeX<=fenceDown.posX+fieldOne*9) &&
        (snakeY==fenceDown.posY)) ) {
            eatTailAudio.play();
            barbedCount++;
            if(barbedCount==7){
                count++;
                if(score>0){
                    score--;
                }
                barbedCount=0;
            }
        }
        if (snakeX == redheart.posX && snakeY == redheart.posY) {
            slowHeart.play();
            locCount = 0;
            milsec = 50;
            redheart = {
                posX: fieldOne * 10,
                posY: fieldOne
            };
            count--;
        }
        function eatTail(head, mas) {
            for (var i = 0; i < mas.length; i++) {
                if (head.posX == mas[i].posX && head.posY == mas[i].posY) {
                    count++;
                    eatTailAudio.play();
                    if (!(document.getElementById('audio-off').classList.contains('done'))) {
                        vibro(true);
                    }
                    if (count < 3) {
                        snake.splice(mas.length - 1, 1);
                    }

                    score = score - 1;
                    if (score < 0)
                        score = 0;


                }


            }
            return count;
        }
        for (let i = 0; i < 250; i = i + fieldOne) {
            context.drawImage(fenceImgUp, fenceUp.posX + i, fenceUp.posY-fieldOne/2);
        }
        for (let i = 0; i < 250; i = i + fieldOne) {
            context.drawImage(fenceImgDown, fenceDown.posX + i, fenceDown.posY+fieldOne/2);
        }
        localStorage.setItem('score', score);
        var pause = document.getElementById('pause');


        pause.addEventListener('click', funPause);
        document.getElementById('pauseLand').addEventListener('click', funPause);
        document.addEventListener('keydown', funPauseESC);

        function funPause(EO) {
            EO = EO || window.event;
            if (!(document.getElementById('audio-off').classList.contains('done'))) {
                click.play();
            }
            document.getElementById('boxPause').classList.add('done');
            clearTimeout(stopGame);
        }

        function funPauseESC(EO) {
            EO = EO || window.event;
            if (EO.keyCode == 27) {
                if (!(document.getElementById('audio-off').classList.contains('done'))) {
                    click.play();
                }
                document.getElementById('boxPause').classList.add('done');
                clearTimeout(stopGame);
            }
        }


       
    }






    var play = document.getElementById('play');
    play.addEventListener('click', funPlay);

    function funPlay(EO) {
        EO = EO || window.event;
        if (!(document.getElementById('audio-off').classList.contains('done'))) {
            click.play();
        }

        document.getElementById('boxPause').classList.remove('done');
        draw();
    }


    var swipe = {
        posX: 20,
        posY: 20,
        speedX: 1,
        speedY: 1,
        width: 100,
        height: 100,
        update: function () {
            var swipeHand = document.getElementById('img-swipe');
            swipeHand.style.left = this.posX + 'px';
            swipeHand.style.bottom = this.posY + 'px';
        }
    };

    var areaH = {
        width: 200,
        height: 200
    };

    function start() {
        requestAnimationFrame(tick);
    }
    start();
    function tick() {
        swipe.posX += swipe.speedX;
        swipe.posY += swipe.speedY;
        if (swipe.posX + swipe.width > areaH.width) {
            swipe.posX = 20;
            swipe.posY = 20;
        }


        swipe.update();
        requestAnimationFrame(tick);
    }

    swipe.update();


});

