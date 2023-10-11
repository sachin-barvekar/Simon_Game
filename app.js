let gameSeq=[];
let userSeq=[];
let highScore=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let maxScore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
    console.log("Game started");
    started=true;
    levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randomBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }else{
        highScore.push(level);
        maxScore=highScore.reduce((max,el)=>{
            if(max<el){
                return el;
            }else{
                return max;
            }
        })
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press any key to start. <br> Highest Score is ${maxScore}`;
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white"
        },150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    btnFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let btnAll=document.querySelectorAll(".btn")
for(btn of btnAll){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}



