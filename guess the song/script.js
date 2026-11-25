const celebrities = [
  {
    name: "Zendaya",
    image: "Zendaya.jpg",
    options: ["Zendaya", "Ariana Grande", "Selena Gomez", "Jenna Ortega"]
  },
  {
    name: "Emma Watson",
    image: "emma watson.jpg",
    options: ["Emma Watson", "Natalie Portman", "Keira Knightley", "Scarlett Johansson"]
  },
  {
    name: "Taylor Swift",
    image: "taylor.jpg",
    options: ["Katy Perry", "Billie Eilish", "Taylor Swift", "Dua Lipa"]
  },
  {
    name: "Kylie Jenner",
    image: "Kylie jenner.jpg",
    options: ["Kylie Jenner", "Kim Kardashian", "Khloé Kardashian", "Cardi B"]
  }
];

let currentIndex = 0;
let score = 0;

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const wowSound = new Audio("wow.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

const celebImg = document.getElementById("celeb-img");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function createPlaceholderImage() {
  const svg = `
    <svg xmlns="http://w3.org" width="220" height="220" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#6c63ff"/>
          <stop offset="1" stop-color="#252538"/>
        </linearGradient>
      </defs>
      <rect width="220" height="220" fill="url(#bg)"/>
      <circle cx="110" cy="82" r="42" fill="#d4b4a7"/>
      <circle cx="110" cy="220" r="82" fill="#d4b4a7"/>
      <text x="110" y="205" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="86" fill="#252538">?</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function loadQuestion() {
  const current = celebrities[currentIndex];
  
  celebImg.src = current.image || createPlaceholderImage();
  celebImg.alt = "Mystery Celebrity";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(btn, option, current.name));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedBtn, selectedOption, correctAnswer) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (selectedOption === correctAnswer) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Ate and left no crumbs!";
    feedbackEl.style.color = "#28a745";

    if (score === 2) {
      playSound(wowSound);
    } else {
      playSound(correctSound);
    }
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.textContent = `Nah twin, thats wrong. ${correctAnswer}`;
    feedbackEl.style.color = "#dc3545";

    playSound(wrongSound);
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < celebrities.length) {
    loadQuestion();
  } else {
    if (score > 2) {
      playSound(wowSound);
    }

    document.querySelector(".game-container").innerHTML = `
      <h1>That's a wrap</h1>
      <p style="margin: 20px 0; font-size: 1.2rem;">You're dope! Final Score: ${score} / ${celebrities.length} </p>
      <button onclick="location.reload()" style="background:#6c63ff; color:white; border:none; padding:12px 24px; border-radius:8px; cursor:pointer; font-size:1rem;">Play again? </button>
    `;
  }
});

loadQuestion();
