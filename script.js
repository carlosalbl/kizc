const text = "Kiziara Coleen M. Suarez 🌸 Registered Nurse 💉🩺";
const typingEl = document.getElementById("typing-text");
let idx = 0;

function type() {
  if (idx < text.length) {
    typingEl.textContent += text[idx];
    idx++;
    setTimeout(type, 100);
  }
}
type();

// Floating aesthetic emojis
function createEmoji() {
  const emojis = ["💖","🌸","💉","🩺","✨","💕","🌷"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  document.body.appendChild(emoji);

  const x = Math.random() * window.innerWidth;
  emoji.style.left = `${x}px`;
  emoji.style.bottom = "0px";
  emoji.style.fontSize = `${Math.random() * 20 + 20}px`;

  setTimeout(() => emoji.remove(), 5000);
}

setInterval(createEmoji, 800);
