const mainContent = document.getElementById("mainContent");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const scrollIndicator = document.getElementById("scrollIndicator");
const welcomeMessage = document.getElementById("welcomeMessage");
const openingScreen = document.getElementById("openingScreen");
const darkRedScreen = document.getElementById("darkRedScreen");
const envelopeLeft = document.getElementById("envelopeLeft");
const envelopeRight = document.getElementById("envelopeRight");

let musicPlaying = false;
let isAnimating = false;

function openEnvelope() {
  if (isAnimating) return;
  
  isAnimating = true;

  openingScreen.classList.add("faded");
  mainContent.classList.remove("hidden");

  playMusic();

  if (typeof confetti === "function") createConfetti();

  document.body.style.overflow = '';
  isAnimating = false;
}

async function playMusic() {
  try {
    if (!musicPlaying) {
      await bgMusic.play();
      musicPlaying = true;
      musicToggle.textContent = "Music On";
    }
  } catch {
    musicToggle.textContent = "Tap Again";
  }
}

darkRedScreen.addEventListener("click", openEnvelope);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (!isAnimating && !openingScreen.classList.contains("faded")) {
      openEnvelope();
    }
  }
});



const targetDate = new Date("2026-04-25T10:30:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


musicToggle.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await bgMusic.play();
      musicPlaying = true;
      musicToggle.textContent = "Music On";
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicToggle.textContent = "Music Off";
    }
  } catch {
    musicToggle.textContent = "Tap Again";
  }
});


function createConfetti() {
  const colors = ["#f8e9c7", "#e8c88f", "#d4b08c", "#f5d9a0"];

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.65 },
      colors
    });
  }, 400);
}


function openMaps() {
  const venueAddress = "Mythri Auditorium, Edakkara, Kerala, India";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;
  window.open(mapsUrl, '_blank');
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    scrollIndicator.classList.add("hidden-indicator");
  } else {
    scrollIndicator.classList.remove("hidden-indicator");
  }
});