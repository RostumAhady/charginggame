
let width = 0;
let holdDown = false;
let pauseAudio;
let isGameOver = false;
let isGameStart = false;
let isChance = false; 
let interval;
let i = 15;
const progressBar = document.querySelector('.progressBar');
const bar = document.querySelector('.bar');
const key = document.querySelector('.key');
const gameOver = document.querySelector('.gameOver');
const aura = document.getElementById('aura');
const now = document.getElementById('now');
const keys = document.querySelector('.keys');
const gif = document.querySelector('.image');
const instructions = document.querySelector('#instructions');
const countdown = document.querySelector('#countdown');
const tryAgain = document.querySelector('.figure');


window.addEventListener('keydown', increaseWidth);
// keys.addEventListener('onclick', increaseWidth);
function increaseWidth(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // code designed for more than 1 key with audio
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio || holdDown === true || isGameOver === true){ // if the key has no audio tied to it then it will not play
        return;
      }
    if(width === 100){
        instructions.innerHTML = "YOU ARE AT FULL POWER! WELL DONE!"
        return;
    } else{
        playAudio();
    }
    if (isGameStart === false){
        isGameStart = true;
        timer();
    }
    if (width < 68 || width > 68){
    instructions.innerHTML = "THAT'S IT! KEEP CHARGING!";
    holdDown = true; // so that the function stops at the if statement if the button is held down
    width+= 1;
    progressBar.style.width = width + "%";
    key.classList.add('playing');
    console.log(progressBar.style.width);
    audio.play() 
    clearTimeout(pauseAudio);
    pauseAudio = setTimeout(() => { 
        audio.pause()
        if(width < 68 || width > 68 && width < 100){
        instructions.innerHTML = "WHAT ARE YOU DOING? SPAM A!"
        } else if(width === 68){
            instructions.innerHTML = "NOW'S YOUR CHANCE!"
        }
     }, 300);
    }
    // setTimeout(gameIsOver, 15000);
    

    }

window.addEventListener('keyup', stopProgress) // If key is released then increaseWidth can continue
function stopProgress(e){
    holdDown = false;
}
key.addEventListener('transitionend', removeTransition);//// removes .playing after it has finished transitioning, time is dictated by css transition value.
bar.addEventListener('transitionend', removeTransition);
function removeTransition(){
    this.classList.remove('playing');
}


function timer(){
    if(width === 100){
        return;
    }
    countdown.innerHTML = i;    
    i--;
    if (i < 0 ) {
        gameIsOver();
      }
      else {
        setTimeout(timer, 1000);
      }
}

function gameIsOver(){
    if(width < 100){
        isGameOver = true;
        gameOver.style.display = "grid";
    }
}

function playAudio(){
    if(width === 30){
        bar.classList.add('playing');
        progressBar.style.background = "orange";
        aura.play();
        auraFade();
    } else if(width === 67){
        now.play();
        nowFade();
    } else if(width === 68 && isChance === false){
        isChance = true;
        gif.style.display = "grid"; //this is here just to be able to toggle it on and off, nothing to do with css grid.
        setTimeout(() => {
            gif.style.display = "none";
            width+= 1;
         }, 2000);
    } else if(width === 70){
        bar.classList.add('playing');
        progressBar.style.background = "green";
        aura.play()
        auraFade()
        width+= 5;
        }
}

function auraFade(){
    if(aura.volume > 0.01){
        aura.volume -= 0.01;
        setTimeout(auraFade, 35);
    } else if(aura.volume < 0.01){
        aura.volume = 1;
        aura.currentTime = 0;
        aura.pause()
    };
}
function nowFade(){
    if(now.volume > 0.01){
        now.volume -= 0.01;
        setTimeout(nowFade, 35);
    } else if(now.volume < 0.01){
        now.volume = 1;
        now.currentTime = 0;
        now.pause()

    };
};

tryAgain.addEventListener('click', resetGame);
function resetGame(){
    isGameOver = false;
    isGameStart = false;
    isChance = false;
    width = 0;
    i = 15;
    countdown.innerHTML = i; 
    instructions.innerHTML = 'SPAM "A" ON YOUR KEYBOARD TO CHARGE UP!';
    progressBar.style.background = "red";
    progressBar.style.width = width + "%";
    gameOver.style.display = "none";
}

