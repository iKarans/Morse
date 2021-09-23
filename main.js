const englishToMorse = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ä: ".-.-",
    á: ".--.-",
    å: ".--.-",
    ą: "·−·−",
    æ: "·−·−",
    ć: "−·−··",
    ĉ: "−·−··",
    ç: "−·−··",
    Ch: "----",
    đ: "··−··",
    ð: "··−−·",
    é: "..-..",
    è: "..-..",
    ę: "..-..",
    ĝ: "−−·−·",
    ĥ: "----",
    ĵ: "·−−−·",
    ł: "·−··−",
    ń: "--.--",
    ñ: "--.--",
    ó: "---.",
    ö: "---.",
    ø: "---.",
    ś: "···−···",
    ŝ: "−−−−",
    š: "−−−−",
    þ: "·−−··",
    ü: "..--",
    ŭ: "··−−",
    ź: "−−··−·",
    ż: "−−··−",
    "&" :'.-...',
    "'" :	".----.",
    "@" : ".--.-.",
    ")" : "-.--.-",
    "(" : "-.--.",
    ":" : "---...",
    "," : "--..--",
    "=": "-...-",
    "!": "-.-.--",
    ".": ".-.-.-",
    "-": "-....-",
    "*": "-..-",
    "0/0": "----- -..-. -----",
    "%": "----- -..-. -----",
    "+": ".-.-.",
    '"': ".-..-.",
    "?": "..--..",
    "/": "-..-.",
    "$": "···−··−", 
    " ": "/",
  };

const morseToEnglish = {};
for (let i=0; i < Object.keys(englishToMorse).length; i++) {
    morseToEnglish[Object.values(englishToMorse)[i]] = Object.keys(englishToMorse)[i];
};

const isValidEnglishInput = (str) => {
    let splitArray = (str.toLowerCase()).split("");
    for(let i = 0; i < splitArray.length; i++) {
        if(!(Object.keys(englishToMorse).includes(splitArray[i]))) {
            return false;
        };
    };
    return true;
};

const translateToMorse = (str) => {
    let solutionArray = [];
    let splitArray = (str.toLowerCase()).split("");
    for(let i = 0; i < splitArray.length; i++) {
        solutionArray.push(englishToMorse[splitArray[i]]);
        if(i != splitArray.length - 1 ) {
            solutionArray.push(" ");
        };
    };
    return solutionArray.join(" ");
};

const translateToEnglish = (str) => {
    let solutionArray = [];
    let splitArray = (str.toLowerCase()).split(" ");
    for(let i = 0; i < splitArray.length; i++) {
        solutionArray.push(morseToEnglish[splitArray[i]]);
    };
    // 😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏
    let solutionString = solutionArray.join("");
    if(solutionString.includes("boobies")) {
        solutionString = solutionString.replace("boobies", "(.Y.)");
    }
    return solutionString;
};
const isValidMorseInput = (str) => {
    let splitArray = str.split(" ");
    for(let i = 0; i < splitArray.length; i++) {
        if(!(Object.values(englishToMorse).includes(splitArray[i]))) {
            return false;
        };
    };
    return true;
};

const exchangeArrows = document.querySelector(".translater__arrows");
const languageOne = document.querySelector(".translater__language-1");
const languageTwo = document.querySelector(".translater__language-2");
const outputOne = document.querySelector(".translater__output-1");
const outputOneB = document.querySelector(".translater__output-1b");
const outputTwo = document.querySelector(".translater__output-2");
const soundIcon = document.querySelector(".translater__sound");
const lightIcon = document.querySelector(".translater__light");
const body = document.querySelector("body");

lightIcon.addEventListener("click", () => {
    body.classList.toggle("grey");
    // languageOne.classList.toggle("light");
    languageTwo.classList.toggle("light");
    outputOne.classList.toggle("light");
    outputOneB.classList.toggle("light");
    outputTwo.classList.toggle("light");
    exchangeArrows.classList.toggle("blackfont");
})

soundIcon.addEventListener("click", () => {
    const morse = new morseSynth();
    if (languageOne.innerText == "English") {
        morse.play(outputOne.value);
    } else {
        morse.play(outputTwo.innerText);
    }
});

exchangeArrows.addEventListener("click", () => {
    if(languageOne.innerText == "English") {
        languageOne.innerText = "Morse";
        languageTwo.innerText = "English";
        outputOne.style.display = "none";
        outputOneB.style.display = "inline-block";

    } else {
        languageOne.innerText = "English";
        languageTwo.innerText = "Morse";
        outputOne.style.display = "inline-block";
        outputOneB.style.display = "none";
    }
    outputOne.value = "";
    outputOneB.value = "";
    outputTwo.innerText = "";
});





outputOne.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        outputOne.value = outputOne.value.slice(0, -1);
        if(isValidEnglishInput(outputOne.value)) {
            outputTwo.innerText = translateToMorse(outputOne.value);
        } else {
            alert("That is an invalid input.");
            console.log(outputOne.value);
            outputOne.value = ""
            outputTwo.innerText = translateToMorse(outputOne.value);
        }
    }
    if(isValidEnglishInput(outputOne.value)) {
        outputTwo.innerText = translateToMorse(outputOne.value);
    } else {
        alert("That is an invalid.");
        outputOne.value = outputOne.value.slice(0, -1);
        outputTwo.innerText = translateToMorse(outputOne.value);
    }
});

outputOneB.addEventListener("keyup", e => {
    if (e.code === "Space") {
        if(isValidMorseInput(outputOneB.value.slice(0, -1))) {
            outputTwo.innerText = translateToEnglish(outputOneB.value);
        } else {
            alert("That is an invalid input.");
            temp = outputOneB.value.split(" ");
            temp.pop();
            temp.pop();
            outputOneB.value = temp.join(" ");
            outputTwo.innerText = translateToEnglish(outputOneB.value);
        };
    } else if (e.code == "Backspace") {
        temp = outputOneB.value.split(" ");
        temp.pop()
        outputOneB.value = temp.join(" ");
        outputTwo.innerText = translateToEnglish(outputOneB.value);
    } else if (e.code == "Enter") {
        outputOneB.value = outputOneB.value.slice(0, -1)
        outputTwo.innerText = translateToEnglish(outputOneB.value);
    }
});


