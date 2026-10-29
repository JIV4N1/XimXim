const $=s=>document.querySelector(s),audio=$('#audio'),play=$('#play');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function purinRain(x,y){const layer=$('#rain');if(layer.children.length>=30)layer.firstChild.remove();const item=document.createElementNS('http://www.w3.org/2000/svg','svg');item.setAttribute('viewBox','0 0 300 290');item.classList.add('falling');item.style.left=Math.max(0,Math.min(innerWidth-80,x-40))+'px';item.style.setProperty('--drift',(Math.random()*80-40)+'px');item.style.setProperty('--rotation',(Math.random()*100-50)+'deg');item.style.setProperty('--touch-y',Math.max(0,y-40)+'px');item.innerHTML='<use href="#purin"/>';layer.append(item);setTimeout(()=>item.remove(),reduced.matches?900:3200)}
document.addEventListener('pointerdown',e=>purinRain(e.clientX,e.clientY));
$('#night').addEventListener('click',()=>{const on=document.body.classList.toggle('night');$('#night').setAttribute('aria-pressed',on);$('#night span').textContent=on?'Luz de día':'Luz de luna'});
$('#wish').addEventListener('click',()=>{$('#letter').showModal();for(let i=0;i<7;i++)setTimeout(()=>purinRain(innerWidth*(.15+Math.random()*.7),100),i*120)});
$('#close').addEventListener('click',()=>$('#letter').close());$('#letter').addEventListener('click',e=>{if(e.target===$('#letter')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
const music = window.MUSIC_CONFIG || {};
const volume = Number.isFinite(music.volume) ? Math.min(1, Math.max(0, music.volume)) : .7;
audio.volume = volume;
$('#volume').value = volume;
audio.loop = music.loop !== false;
let started = false;
async function startBackgroundMusic(event) {
  if (started || !music.src || event.target.closest('#play, #seek, #volume')) return;
  try { await audio.play(); started = true; } catch { /* The play button remains available. */ }
}
document.addEventListener('pointerdown', startBackgroundMusic);
document.addEventListener('keydown', startBackgroundMusic);
audio.addEventListener('loadedmetadata',()=>{play.disabled=false;$('.timeline').hidden=false;$('#duration').textContent=format(audio.duration);$('#seek').value=0;$('#elapsed').textContent='0:00'});
play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();started=true}catch{$('#audio-status').textContent='No se pudo iniciar la música. Toca reproducir para intentarlo otra vez.'}}else audio.pause()});
function sync(){play.textContent=audio.paused?'▶':'Ⅱ';play.setAttribute('aria-label',audio.paused?'Reproducir canción':'Pausar canción');$('.music').classList.toggle('playing',!audio.paused)}
['play','pause','ended'].forEach(event=>audio.addEventListener(event,sync));
function format(n){return Number.isFinite(n)?Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0'):'0:00'}
audio.addEventListener('timeupdate',()=>{$('#elapsed').textContent=format(audio.currentTime);$('#seek').value=audio.duration?audio.currentTime/audio.duration*100:0});
$('#seek').addEventListener('input',e=>{if(Number.isFinite(audio.duration))audio.currentTime=audio.duration*e.target.value/100});$('#volume').addEventListener('input',e=>audio.volume=Number(e.target.value));
audio.addEventListener('error',()=>{play.disabled=true;$('.timeline').hidden=true;$('#audio-status').textContent='La música no está disponible por el momento.';sync()});
if (typeof music.src === 'string' && music.src.trim()) {
  $('#track-name').textContent = music.title || 'Una melodía elegida con cariño para ti.';
  audio.src = music.src;
  audio.load();
} else {
  $('.music-note').textContent = 'Esta noche, la tranquilidad también suena bonito.';
  $('#track-name').textContent = 'Pronto habrá una canción especial aquí.';
}
