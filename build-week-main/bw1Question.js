const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language, they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const tempoTotale = 60; // 60 secondi
let tempoRimanente = tempoTotale;

function updateTimer() {
  const tempoDisplay = document.getElementById("timer");

  // Calcolo i secondi rimanenti
  const seconds = tempoRimanente % 61;

  // Formatto il tempo per la visualizzarlo
  tempoDisplay.textContent = seconds;

  // Calcolo la percentuale del tempo rimanente
  const percent = tempoRimanente / tempoTotale;

  // Calcolo l'angolo per la rotazione del bordo (in percentuale)
  const progresso = 360 * (1 - percent);

  // Aggiorno il gradiente del bordo
  document
    .querySelector(".circle")
    .style.setProperty("--progress", `${progresso}deg`);

  // Riduco il tempo rimanente
  tempoRimanente--;

  // Se il tempo è scaduto, ferma il timer
  if (tempoRimanente < 0) {
    // Se l'utente non clicca, allo scade del timer vai alla prossima domanda
    checkAnswer(null);
  }
}

// Avvio il timer e aggiorna ogni secondo
const timerIntervallo = setInterval(updateTimer, 1000);

// Imposta il timer inizialmente
updateTimer();

let score = 0; // Variabile globale per il punteggio
let questionNumber = 0; // Variabile per tenere traccia del numero di domanda

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion(); // Carica la prima domanda

  const answerButtons = document.querySelectorAll(".answer_input");
  answerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      checkAnswer(this.value);
    });
  });
});

function loadQuestion() {
  if (questionNumber >= questions.length) {
    showScore();
    return;
  }

  const currentQuestion = questions[questionNumber];
  document.querySelector(".domanda").textContent = currentQuestion.question;

  if (questions[questionNumber].type === "boolean") {
    let third = document.getElementById("3");
    let fourth = document.getElementById("4");
    third.style.display = "none";
    fourth.style.display = "none";
  }

  if (questions[questionNumber].type === "multiple") {
    let third = document.getElementById("3");
    let fourth = document.getElementById("4");
    third.style.display = "block";
    fourth.style.display = "block";
  }

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];
  answers.sort(() => Math.random() - 0.5); // Mescola le risposte

  // Carica le risposte nei pulsanti
  answers.forEach((answer, index) => {
    document.getElementById((index + 1).toString()).value = answer;
  });
}

function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[questionNumber];

  if (selectedAnswer === currentQuestion.correct_answer) {
    score++;
  }

  questionNumber++; // Passa alla domanda successiva
  let counterQuestions = document.querySelector("#question_page");
  counterQuestions.textContent = questionNumber + 1;

  loadQuestion(); // Ricarica la prossima domanda
  tempoRimanente = tempoTotale;
}

function showScore() {
  document.querySelector(".core").innerHTML = `<div class="header">
            <img class="logo_q" src="./img/epicode_logo.png" alt="">
        </div>
      <h1 class="final-score">Your Score: ${score}/${questions.length}</h1>
    `;
}
