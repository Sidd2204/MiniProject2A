const quizData = [
  {
    question: "Word 1",
    options: ["1", "2", "3", "4"],
    correct: 0,
  },
  {
    question: "Word 2",
    options: ["A", "B", "C", "D"],
    correct: 1,
  },
  {
    question: "Word 3",
    options: ["a", "b", "c", "d"],
    correct: 0,
  },
  {
    question: "Word 4",
    options: ["i", "ii", "iii", "iv"],
    correct: 1,
  },
  {
    question: "Word 5",
    options: ["I", "II", "III", "IV"],
    correct: 0,
  },
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const endBtn = document.getElementById("endBtn");

document.addEventListener("DOMContentLoaded", loadQuestion);

var username = window.location.href.split("/");
username = username[username.length - 1];

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];

  // Set question text
  questionEl.textContent = currentQuizData.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Set new options
  currentQuizData.options.forEach((option, index) => {
    const optionEl = document.createElement("div");
    optionEl.classList.add("option");
    optionEl.innerHTML = `
            <label>
                <input type="radio" name="option" value="${index}">
                ${option}
            </label>
        `;
    optionsContainer.appendChild(optionEl);
  });

  // Handle button visibility
  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";
    endBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    endBtn.style.display = "none";
  }
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function endTest() {
  alert("Test completed! Thank you for participating.");
  // You can add any additional functionality here, like submitting answers.
  window.location.href = `http://127.0.0.1:5000/homepage/${username}`;
}
