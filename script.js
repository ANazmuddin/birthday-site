const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const container = document.querySelector(".container");
const typingText = document.getElementById("typing-text");

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  container.style.display = "block";
  music.play();
});

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊 Matikan Musik";
  } else {
    music.pause();
    toggleBtn.textContent = "🔈 Mainkan Musik";
  }
});

// Typing effect per slide
const slides = [
  "Semoga hari-harimu penuh kebahagiaan, tawa, dan cinta 🎂💖",
  "Jangan lupa bersyukur atas semua pencapaianmu 🌟",
  "Semoga impianmu satu per satu terwujud ✨",
  "Tetap semangat, terus jadi versi terbaik dirimu! 💪💖",
];

let slideIndex = 0;
let charIndex = 0;

function typeNextChar() {
  if (charIndex < slides[slideIndex].length) {
    typingText.textContent += slides[slideIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeNextChar, 50);
  } else {
    setTimeout(() => {
      eraseText();
    }, 2000); // tunggu 2 detik sebelum menghapus
  }
}

function eraseText() {
  if (charIndex > 0) {
    typingText.textContent = slides[slideIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 20);
  } else {
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(typeNextChar, 500);
  }
}

typeNextChar();

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50 + 50,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0
  };
}

for (let i = 0; i < 150; i++) {
  confetti.push(createConfettiPiece());
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.lineWidth = c.r / 2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
    ctx.stroke();
  });

  update();
  requestAnimationFrame(draw);
}

function update() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);

    if (c.y > canvas.height) {
      c.x = Math.random() * canvas.width;
      c.y = -20;
    }
  });
}

draw();
