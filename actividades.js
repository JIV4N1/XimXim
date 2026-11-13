const scenarios = [
  ['0-2','En clase comparan dos esquemas de anestesia regional. En uno, el anestésico está en contacto con el líquido cefalorraquídeo. ¿Qué espacio debes señalar?', 'Piensa dónde circula el líquido cefalorraquídeo.'],
  ['1-0','En una mesa de práctica hay dos hilos del mismo material, uno 3-0 y otro 5-0. ¿Qué diferencia esperas encontrar en el 5-0?', 'Cuenta los ceros y recuerda qué mide el calibre.'],
  ['2-1','En un diagrama monopolar, una flecha sale del lápiz y atraviesa el tejido. ¿Qué elemento falta para completar el recorrido de regreso al generador?', 'Busca el componente con una superficie amplia de contacto.'],
  ['3-2','En una grabación de laparoscopia se ven varios canales en la pared abdominal. ¿Qué función cumplen durante la intervención?', 'Distingue el canal de los instrumentos que pasan por él.'],
  ['4-1','Al ordenar una bandeja de simulación encuentras una aguja curva y necesitas identificar el instrumento diseñado para sostenerla. ¿Cuál eliges?', 'El nombre de este portagujas comparte una palabra con el de una tijera robusta.']
];
const pairs = [
  ['0-0','Anestesia general','Inconsciencia farmacológica'],
  ['0-2','Espacio subaracnoideo','Contiene líquido cefalorraquídeo'],
  ['1-1','Monofilamento','Hilo formado por una sola hebra'],
  ['1-3','Nylon','Sutura sintética no absorbible'],
  ['2-1','Placa de retorno','Completa el circuito monopolar'],
  ['2-4','Pedal','Mando de activación del equipo'],
  ['3-1','Artroscopia','Exploración de una articulación'],
  ['3-2','Puerto laparoscópico','Canal de acceso al abdomen'],
  ['4-2','Separador de Deaver','Mantiene tejidos apartados'],
  ['4-4','Tijera de Littauer','Retira puntos de sutura']
];
function react(correct) {
  const mascot = document.querySelector('header img');
  if (mascot.animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mascot.animate(correct ? [{transform:'translateY(0)'},{transform:'translateY(-9px) rotate(-8deg)'},{transform:'translateY(0)'}] : [{transform:'rotate(-5deg)'},{transform:'rotate(5deg)'},{transform:'rotate(0)'}], {duration:420});
  }
}
function meter(value,total) {
  const bar = el('progress','');
  bar.max = total; bar.value = value;
  bar.setAttribute('aria-label','Progreso de la ronda');
  return bar;
}
function activityMenu() {
  el('h3','Aprende jugando');
  const grid = el('div',''); grid.className = 'practice-grid';
  for (const [title,description,action] of [
    ['Conecta las parejas','Une cuatro conceptos con su función.',matchRound],
    ['Resuelve un caso','Interpreta cinco situaciones de aula con pistas opcionales.',() => {
      const cases = scenarios.map(([id,casePrompt,hint]) => ({...items.find(item=>item.id===id),casePrompt,hint}));
      start(shuffled(cases),'cases');
    }]
  ]) {
    const tile = button('',action,grid,'activity-tile');
    el('strong',title,tile); el('small',description,tile);
  }
}
function matchRound() {
  clear(); button('← Módulos',home);
  el('h2','Conecta las parejas'); el('p','Elige un concepto y después la descripción que le corresponde.');
  const round = shuffled(pairs).slice(0,4);
  const bar = meter(0,round.length);
  const board = el('div',''); board.className='pair-board';
  const terms = el('div','',board), meanings = el('div','',board);
  el('h3','Conceptos',terms); el('h3','Descripciones',meanings);
  const note = el('p',''); note.setAttribute('role','status');
  const lookup = new Map(), mistakes = new Set();
  let selected = null;
  for (const [id,label] of round) {
    const node = button(label,()=>{
      if(selected) lookup.get(selected).setAttribute('aria-pressed','false');
      selected=id; node.setAttribute('aria-pressed','true');
      note.textContent='Seleccionaste '+label+'. Elige su descripción.';
    },terms,'pair');
    lookup.set(id,node); node.setAttribute('aria-pressed','false');
  }
  for (const [id,,meaning] of shuffled(round)) {
    const node = button(meaning,()=>{
      if(!selected) {note.textContent='Selecciona primero un concepto.';return;}
      const correct = selected===id;
      react(correct);
      if(!correct) {
        mistakes.add(selected); note.textContent='Esta descripción corresponde a otro concepto. Intenta otra pareja.';
        return;
      }
      const item = items.find(entry=>entry.id===id);
      save(item,!mistakes.has(id));
      const term = lookup.get(id);
      term.disabled=true; node.disabled=true; selected=null;
      term.setAttribute('aria-pressed','false');
      bar.value+=1;
      note.textContent=term.textContent+' — '+meaning+'. '+bar.value+' de 4 parejas.';
      if(bar.value===4) {
        el('h3','¡Ronda completa!');
        el('p',(4-mistakes.size)+' de 4 parejas al primer intento.');
        if(mistakes.size) button('Repasar las que costaron',()=>start(items.filter(entry=>mistakes.has(entry.id)),'cards'));
        button('Jugar otra ronda',matchRound,screenArea,'accent');
      }
    },meanings,'pair');
  }
}
