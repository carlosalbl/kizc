const fullName = 'Kiziara Coleen M. Suarez';
const subtitleEl = document.getElementById('subtitle');
const nameEl = document.getElementById('nameLine');
const card = document.getElementById('card');

let typingSpeed = 90;
let continuousPop = true;
let typingTimeouts = [];

// Cuter emojis
const pops = ['🌸','🌷','🌼','💖','💗','💘','🐰','🧸','🍓','🎀'];

function spawnPop(x, y){
  const el = document.createElement('div');
  el.className = 'pop';
  el.textContent = pops[Math.floor(Math.random()*pops.length)];
  const size = 24 + Math.random()*28; 
  el.style.left = (x - size/2) + 'px';
  el.style.top = (y - size/2) + 'px';
  el.style.fontSize = size + 'px';
  card.appendChild(el);
  setTimeout(()=> el.remove(), 1000);
}

function playTyping(){
  clearTyping();
  nameEl.textContent = '';
  subtitleEl.style.opacity = 0; subtitleEl.style.transform = 'translateY(6px)';
  let idx = 0;
  function typeNext(){
    if(idx <= fullName.length){
      nameEl.textContent = fullName.slice(0, idx);
      const char = fullName[idx-1];
      if(char && /[aeiouAEIOU\\s\\.\\-]/.test(char)){
        const rect = nameEl.getBoundingClientRect();
        const x = rect.left + (idx/fullName.length)*rect.width - card.getBoundingClientRect().left;
        const y = rect.top + rect.height/2 - card.getBoundingClientRect().top;
        spawnPop(x, y);
      }
      idx++;
      const t = setTimeout(typeNext, typingSpeed + Math.random()*20);
      typingTimeouts.push(t);
    } else {
      subtitleEl.style.transition = 'opacity 420ms ease, transform 420ms ease';
      subtitleEl.style.opacity = 1; subtitleEl.style.transform = 'translateY(0)';
      if(continuousPop) startContinuousPops();
    }
  }
  typeNext();
}

function clearTyping(){
  typingTimeouts.forEach(t=>clearTimeout(t));
  typingTimeouts = [];
  stopContinuousPops();
}

let continuousInterval = null;
function startContinuousPops(){
  stopContinuousPops();
  continuousInterval = setInterval(()=>{
    const rect = card.getBoundingClientRect();
    const x = Math.random()*(rect.width-40)+20;
    const y = Math.random()*(rect.height-40)+20;
    spawnPop(x,y);
  }, 500);
}
function stopContinuousPops(){
  if(continuousInterval){clearInterval(continuousInterval);continuousInterval=null}
}

document.getElementById('replayBtn').addEventListener('click', ()=>{ playTyping(); });
document.getElementById('fasterBtn').addEventListener('click', ()=>{ typingSpeed = Math.max(30, typingSpeed - 20); playTyping(); });
document.getElementById('slowerBtn').addEventListener('click', ()=>{ typingSpeed = typingSpeed + 30; playTyping(); });
document.getElementById('toggleContinuous').addEventListener('click',(e)=>{
  continuousPop = !continuousPop;
  e.currentTarget.textContent = continuousPop ? '💖 Pop ON' : '💤 Pop OFF';
  if(!continuousPop) stopContinuousPops(); else startContinuousPops();
});

card.addEventListener('click',(ev)=>{
  const rect = card.getBoundingClientRect();
  const x = ev.clientX - rect.left; 
  const y = ev.clientY - rect.top;
  spawnPop(x,y);
});

window.addEventListener('load', ()=>{
  setTimeout(()=> playTyping(), 600);
});