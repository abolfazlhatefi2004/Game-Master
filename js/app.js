const generator = document.querySelector(".generator");
const gameBody = document.querySelector(".game__body");
const colorBody = document.querySelector(".color__body");
const btnScore = document.querySelector(".score__btn");
const hintBody = document.querySelector(".hint__body");
const hearts = document.querySelector(".heart__place");

const Color = ["primary", "success", "danger", "dark", "light"];
const answerCOlors = [];
const gameColor = [];

let gameChecker = 0;
let rowCounter = 0;

// flags
let flagHoles = true;

const generateRow = () => {
    gameBody.innerHTML += `<div class="card m-2 col-8 border-primary">
    <div class="card-body row gap-1 justify-content-between">
        <div class="game__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-holeNumber="0" data-row='${rowCounter}'></div>

        <div class="game__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-holeNumber="1" data-row='${rowCounter}'></div>

        <div class="game__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-holeNumber="2" data-row='${rowCounter}'></div>

        <div class="game__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-holeNumber="3" data-row='${rowCounter}'></div>

        <div class="game__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-holeNumber="4" data-row='${rowCounter}'></div>
    </div>
</div>`;

    hintBody.innerHTML += `<div class="card m-2 col-10 border-primary">
    <div class="card-body row gap-1 justify-content-between">
        <div class="answer__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-row='${rowCounter}'>
        </div>

        <div class="answer__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-row='${rowCounter}'></div>

        <div class="answer__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-row='${rowCounter}'></div>

        <div class="answer__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-row='${rowCounter}'></div>

        <div class="answer__place border border-dark border-3 rounded-circle bg-secondary col-2"
            data-row='${rowCounter}'></div>
    </div>
</div>`;
};
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
    const holes = gameBody.children[rowCounter].children[0].children;
    for (let i = 0; i < holes.length; i++) {
        if (holes[i].classList.contains('bg-secondary')) {
            flagHoles = false;
            return alert('you should fill of the holes');
        }
    }
    flagHoles = true;
};
const colorChecker = () => {
    let samlpeAnswerColor = answerCOlors.map(item => item);
    let sampleGameColor = gameColor.map(item => item);
    let setHint = hintBody.children[rowCounter].children[0];
    let trueColors = [];
    let indexColrs = 0;
    for (let i = 0; i < samlpeAnswerColor.length; i++) {
        for (let j = 0; j < sampleGameColor.length; j++) {
            if (samlpeAnswerColor[i] === sampleGameColor[j]) {
                samlpeAnswerColor.splice(samlpeAnswerColor[i], 1);
                sampleGameColor.splice(sampleGameColor[j], 1);
                i--;
                trueColors[indexColrs] = indexColrs;
                indexColrs++;
                break;
            }
        }
    }
    trueColors.map((item, index) => {
        setHint.children[item].classList.remove('bg-secondary');
        setHint.children[item].classList.add('bg-light');
    });
};
const placeCheker = () => {
    let setHint = hintBody.children[rowCounter].children[0];
    let indexPlace = 0;
    answerCOlors.map((item, index) => {
        if (item == gameColor[index]) {
            gameChecker++;
            indexPlace++;
        }
    });
    for (let i = 0; i < indexPlace; i++) {
        setHint.children[i].classList.remove('bg-secondary');
        setHint.children[i].classList.remove('bg-light');
        setHint.children[i].classList.add('bg-dark');

    }
};
const judgementGame = () => {
    const heartPlace = hearts.children;
    if (gameChecker == 5) {
        btnScore.setAttribute('data-bs-target', '#staticBackdrop');
        btnScore.setAttribute('data-bs-toggle', 'modal');
        btnScore.click();
    } else {
        rowCounter++;
        generateRow();
        heartPlace[0].remove();
        gameChecker = 0;
    }

};

generateAnswerColor();



gameBody.addEventListener("click", (e) => {
    let rowChecker = Number(e.target.getAttribute(`data-row`));
    if (e.target.classList.contains('game__place') && rowChecker == rowCounter) {
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
        placeCheker();
        judgementGame();
    }


});



