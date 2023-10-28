const generator = document.querySelector(".generator");
const gameBody = document.querySelector(".game__body");
const colorBody = document.querySelector(".color__body");
const btnScore = document.querySelector(".score__btn");

const Color = ["primary", "success", "danger", "dark", "light"];
const answerCOlors = [];
const gameColor = [];


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
        const holeNumber = "";
        if (Event.target.classList.contains('color__place')) {
            console.log(targetTag);
            console.log(targetTag.getAttribute('data-holeNumber'));
            color += Event.target.getAttribute('data-color');
            targetTag.className = `game__place border border-dark border-3 rounded-circle bg-${color}   col-2`;
            // gameColor[holeNumber] = color;
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
const colorCheck = () => {

}


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
        console.log(gameColor);
    }


});



