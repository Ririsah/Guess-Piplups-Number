// ***** -------- Var -------- *****
let rightNum = Math.trunc(Math.random() * 100) + 1;
let score = 10;
let highScore = 0;



// ***** -------- Sound Effects -------- *****
const checkBtn = new Audio("/src/assets/sfx/check_btn.mp3");
const againBtn = new Audio("/src/assets/sfx/again_btn.mp3");
const gameClear = new Audio("/src/assets/sfx/game_clear.mp3");
const gameOver = new Audio("/src/assets/sfx/game_over.mp3");
const piplupSound = new Audio("/src/assets/sfx/piplup_sound.mp3");
const gameTheme = new Audio("/src/assets/sfx/game_theme.mp3");

againBtn.volume = 0.2;
piplupSound.volume = 0.2;
gameTheme.loop = true;
gameTheme.volume = 0.1;



// ***** -------- Functional Functions -------- *****
// mudar a mensagem no display com animação
let typingTimeout; 
let isTyping = false;
const textAnimation = function (text) {
    const textElement = document.querySelector('.tip');
    let index = 0;

    if (isTyping) return; 
    isTyping = true;

    clearTimeout(typingTimeout); 
    textElement.textContent = ""; 

    function typeText() {
        if (index < text.length) {
            textElement.textContent += text[index];
            index++;
            typingTimeout = setTimeout(typeText, 10);
        } else {
            isTyping = false; 
        }
    }

    typeText();
};

// mudar as expressões do piplup
const piplupExpressions = function (piplupImg) {
    document.querySelector('.content_box_3').style.background = `url("src/assets/images/${piplupImg}.png") center / cover`;
}

// calcular o score
let clickCounter = 1;
const countScore = () => {
    if (score !== 0) {
        score--;
        document.querySelector('.score').textContent = `${score}`;
    } else {
        isTyping = false;
        piplupExpressions(`p_4`);
        gameTheme.pause();
        
        clickCounter++;
        if (clickCounter >= 1 && clickCounter < 3) {
            gameOver.play();
            textAnimation(`Ha ha! I won, L-O-S-E-R! (≧∇≦)/`);
        } else if (clickCounter < 7) {
            textAnimation(`Deal with it, you lost, loser! (≧∇≦)/`);
        } else if (clickCounter < 14) {
            textAnimation(`LOSER! LOSER! LOSER! LOSER! LOSER! (≧∇≦)/`);
        } else {
            textAnimation(`STOP!!!! WHAT'S YOUR PROBLEM?! LET'S PLAY AGAIN! 凸(｀⌒´)凸`);
            piplupExpressions(`p_3`);
        }
    }
};

// animação do numero no display
const displayAnimation = function () {
    const element = document.querySelector('.display');
    element.style.transform = "translateY(-5px)";

    setTimeout(() => {
        element.style.transform = "translateY(5px)";
    }, 1000);
}

setInterval(displayAnimation, 2000);




// ***** -------- Game Function -------- *****
// conferir o numero inserido e dar uma dica
document.querySelector('.check_btn').addEventListener('click', function () {
    gameTheme.play();
    checkBtn.play();
    const myNum = Number(document.querySelector(".my_num").value);

    // caso nenhum numero seja digitado
    if (!myNum) {
        textAnimation(`Are you dumb or something??? Write a number! (ಠ_ʖಠ)`);
        piplupExpressions(`p_3`);
        piplupSound.play();

    // caso o numero digitado seja maior que o secreto
    } else if (myNum > rightNum) {
        textAnimation(`Naah, too High! Try again! ╮(︶▽︶)╭`);
        piplupExpressions(`p_2`);
        countScore();
        piplupSound.play();

    // caso o numero digitado seja menor que o secreto
    } else if (myNum < rightNum) {
        textAnimation(`Higher! R u even trying?? ( ˘▽˘)っ`);
        piplupExpressions(`p_6`);
        countScore();
        piplupSound.play();

    // caso o numero digitado seja igual o secreto
    } else if (myNum === rightNum) {
        textAnimation(`WHAT??? How? You cheated! ｡ﾟ･ (ᗒᗩᗕ) ･ﾟ｡`);
        piplupExpressions(`p_5`);
        gameClear.play();
        gameTheme.pause();
        document.querySelector('.display').textContent = `${rightNum}`;

        if (score > highScore) {
            highScore = score;
            document.querySelector('.high_score').textContent = `${highScore}`;
        }
    }
});

document.querySelector('.again_btn').addEventListener('click', function () {
    rightNum = Math.trunc(Math.random() * 100) + 1;
    score = 10;
    clickCounter = 1;

    document.querySelector('.score').textContent = `${score}`;
    document.querySelector('.display').textContent = `?`;
    document.querySelector('.my_num').value = ` `;
    textAnimation(`All right, let me kick your ass again (✿◡‿◡)`);
    piplupExpressions(`p_1`);
    againBtn.play();
    gameTheme.currentTime = 0;
    gameTheme.play();
});





