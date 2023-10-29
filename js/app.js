const generator = document.querySelector(".generator");
const gameBody = document.querySelector(".game__body");
const colorBody = document.querySelector(".color__body");
const btnScore = document.querySelector(".score__btn");
const hintBody = document.querySelector(".hint__body");

const Color = ["primary", "success", "danger", "dark", "light"];
const answerCOlors = [];
const gameColor = [];

const colorCheck = [];


// flags
let flagHoles = true;



const generateAnswerColor = () => {
    Color.map((item, index) => {
        const random = Math.floor(Math.random() * 5);
        generator.innerHTML += `<div class='game__place border border-dark border-3 rounded-circle bg-${Color[random]} col-2'}></div>`;
        answerCOlors[index] = Color[random];
    });
};
const setColor = (targetTag) => {
    colorBody.addEventListener("click", (Event) => {
        let color = "";
        let holeNumber = 0;
        if (Event.target.classList.contains('color__place')) {
            color = Event.target.getAttribute('data-color');
            targetTag.className = `game__place border border-dark border-3 rounded-circle bg-${color}   col-2`;

            holeNumber = Number(targetTag.getAttribute('data-holeNumber'));
            gameColor[holeNumber] = color;
        }
        targetTag = "";
    });

};
const holesCheck = () => {
    const holes = gameBody.children;
    for (let i = 0; i < holes.length; i++) {
        if (holes[i].classList.contains('bg-secondary')) {
            flagHoles = false;
            return alert('you should fill of the holes');
        }
    }
};
const colorChecker = () => {
    let samlpeAnswerColor = answerCOlors.map(item => item);
    let sampleGameColor = gameColor.map(item => item);
    let trueColors = [];
    let indexColrs = 0;
    console.log(sampleGameColor);
    console.log(samlpeAnswerColor);
    for (let i = 0; i < samlpeAnswerColor.length; i++) {
        for (let j = 0; j < sampleGameColor.length; j++) {
            if (samlpeAnswerColor[i] === sampleGameColor[j]) {
                samlpeAnswerColor.splice(samlpeAnswerColor[i], 1);
                console.log("i=" + i);
                sampleGameColor.splice(sampleGameColor[j], 1);
                console.log("j=" + j);

                i--;
                j = sampleGameColor.length + 1;
                trueColors[indexColrs] = indexColrs;
                indexColrs++;
            }
        }
    }
    trueColors.map((item) => {
        hintBody.children[item].classList.remove('bg-secondary');
        hintBody.children[item].classList.add('bg-light');
    });
};


generateAnswerColor();



gameBody.addEventListener("click", (e) => {
    if (e.target.classList.contains('game__place')) {
        colorBody.classList.add("shadow");
        setColor(e.target);
    } else {
        colorBody.classList.remove("shadow");
    }

});
btnScore.addEventListener("click", () => {
    holesCheck();
    if (flagHoles) {
        colorChecker();
    }


});



