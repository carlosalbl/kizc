const text = "Kiziara Coleen M. Suarez - 1st Year Nursing Student 💉🩺🌸";
const typingEl = document.getElementById("typing-text");
let idx = 0;

function type() {
  if (idx < text.length) {
    typingEl.textContent += text[idx];
    idx++;
    setTimeout(type, 120);
  }
}
type();

function createEmoji() {
  const emojis = ["💖","🌸","💉","🩺","✨","💕"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  document.body.appendChild(emoji);

  const x = Math.random() * window.innerWidth;
  emoji.style.left = `${x}px`;
  emoji.style.bottom = "0px";

  setTimeout(() => emoji.remove(), 4000);
}

setInterval(createEmoji, 1000);
