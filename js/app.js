const generator = document.querySelector(".generator");
const gameBody = document.querySelector(".game__body");
const colorBody = document.querySelector(".color__body");
const btnScore = document.querySelector(".score__btn");
const setModul = document.querySelector(".mdl__place");
const hintBody = document.querySelector(".hint__body");
const heartHome = document.querySelector(".heart__place");
const hearts = heartHome.children;

// easyLevel colors
const Color = ["primary", "success", "danger", "dark", "light"];
// hardLevel colors
const hardColor = ["primary", "success", "danger", "dark", "light", "info", "warning", "bootstrap-color"];
const answerCOlors = [];
const gameColor = [];

let gameChecker = 0;
let rowCounter = 0;
let holeNumber = 0;

// flags
let flagHoles = true;
let flagHeart = true;


const generateRow = () => {
    gameBody.innerHTML += `<div class="card__place card m-2 col-8 border-primary">
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
    const colorCounter = colorBody.children.length;
    if (colorCounter == 5) {
        Color.map((item, index) => {
            const random = Math.floor(Math.random() * 5);
            generator.innerHTML += `<div class='game__place border border-dark border-3 rounded-circle bg-${Color[random]} col-2'}></div>`;
            answerCOlors[index] = Color[random];
        });
    } else {
        Color.map((item, index) => {
            const random = Math.floor(Math.random() * 8);
            generator.innerHTML += `<div class='game__place border border-dark border-3 rounded-circle bg-${hardColor[random]} col-2'}></div>`;
            answerCOlors[index] = hardColor[random];
        });
    }
};
const setColor = (targetTag) => {
    colorBody.addEventListener("click", (Event) => {
        let color = "";
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
            return alert('you should fill all of the holes');
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
                samlpeAnswerColor.splice(i, 1);
                sampleGameColor.splice(j, 1);
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
const heartCheck = () => {
    const heartPlace = hearts.length;
    if (heartPlace == 3 && flagHeart) {
        alert('be careful,you going to be loser');
        heartHome.classList.remove('border-success');
        heartHome.classList.add('border-danger');
    } else if (heartPlace == 0 && flagHeart) {

        setModul.children[0].innerHTML = `LOSER`;
        setModul.classList.remove('text-success');
        setModul.classList.add('text-danger');

        btnScore.setAttribute('data-bs-target', '#staticBackdrop');
        btnScore.setAttribute('data-bs-toggle', 'modal');
        btnScore.click();
    }
}
const judgementGame = () => {
    if (gameChecker == 5) {
        flagHeart = false;
        btnScore.setAttribute('data-bs-target', '#staticBackdrop');
        btnScore.setAttribute('data-bs-toggle', 'modal');
        btnScore.click();
    } else {
        hearts[0].remove();
        heartCheck();
        rowCounter++;
        generateRow();
        gameChecker = 0;
    }

};

generateAnswerColor();


colorBody.addEventListener("click", (e) => {
    const holesGame = gameBody.children[rowCounter].children[0].children;
    let color = "";
    if (e.target.classList.contains('color__place')) {
        color = e.target.getAttribute('data-color');
        for (let i of holesGame) {
            if (i.classList.contains('bg-secondary')) {

                i.classList.remove('bg-secondary');
                i.classList.add(`bg-${color}`);
                holeNumber = Number(i.getAttribute('data-holeNumber'));
                gameColor[holeNumber] = color;
                break;
            }
        }
    }
});
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

