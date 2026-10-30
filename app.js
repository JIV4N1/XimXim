const $=s=>document.querySelector(s),audio=$('#audio');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function purinRain(x,y){const layer=$('#rain');if(layer.children.length>=30)layer.firstChild.remove();const item=document.createElementNS('http://www.w3.org/2000/svg','svg');item.setAttribute('viewBox','0 0 300 290');item.classList.add('falling');item.style.left=Math.max(0,Math.min(innerWidth-80,x-40))+'px';item.style.setProperty('--drift',(Math.random()*80-40)+'px');item.style.setProperty('--rotation',(Math.random()*100-50)+'deg');item.style.setProperty('--touch-y',Math.max(0,y-40)+'px');item.innerHTML='<use href="#purin"/>';layer.append(item);setTimeout(()=>item.remove(),reduced.matches?900:3200)}
document.addEventListener('pointerdown',e=>purinRain(e.clientX,e.clientY));

$('#wish').addEventListener('click',()=>{$('#letter').showModal();for(let i=0;i<7;i++)setTimeout(()=>purinRain(innerWidth*(.15+Math.random()*.7),100),i*120)});
$('#close').addEventListener('click',()=>$('#letter').close());$('#letter').addEventListener('click',e=>{if(e.target===$('#letter')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
// Music is configured by the owner; no visitor controls are rendered.
const music = window.MUSIC_CONFIG || {};
audio.volume = Number.isFinite(music.volume) ? Math.min(1, Math.max(0, music.volume)) : .35;
audio.loop = music.loop !== false;
let started = false;
const activationEvents = ['pointerdown', 'touchend', 'click', 'keydown'];
async function startBackgroundMusic() {
  if (started || !music.src) return;
  try {
    await audio.play();
    started = true;
    activationEvents.forEach(event => document.removeEventListener(event, startBackgroundMusic));
  } catch {
    // Audible autoplay may be blocked. Retry on the next user interaction.
  }
}
if (typeof music.src === 'string' && music.src.trim()) {
  audio.src = music.src;
  activationEvents.forEach(event => document.addEventListener(event, startBackgroundMusic));
  startBackgroundMusic();
}
