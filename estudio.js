const screenArea = document.querySelector('#screen');
const items = modules.flatMap(([topic, source, summary, rows], group) =>
  rows.map(([question, answer, wrong1, wrong2, explanation, page], i) => ({
    id: group + '-' + i, group, topic, source, question, answer, choices: [answer, wrong1, wrong2], explanation, page
  })));
const progressKey = 'ximena-estudio-v1';
let progress = {};
try { progress = JSON.parse(localStorage.getItem(progressKey)) || {}; } catch {}
let deck = [], index = 0, kind = '', missed = [];
function save(item, correct) {
  progress[item.id] = { correct, due: Date.now() + (correct ? 86400000 : 0) };
  try { localStorage.setItem(progressKey, JSON.stringify(progress)); } catch {}
}
function shuffled(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function el(tag, text, parent = screenArea) {
  const node = document.createElement(tag);
  node.textContent = text;
  parent.append(node);
  return node;
}
function button(text, act, parent = screenArea, cls = '') {
  const node = el('button', text, parent);
  node.className = cls;
  node.onclick = act;
  return node;
}
function clear() { screenArea.replaceChildren(); }
function source(item, parent) {
  el('small', item.source + ' · ' + (item.source.endsWith('pptx') ? 'Diapositiva ' : 'Página ') + item.page, parent);
}
function home() {
  clear();
  el('h2','Tu guía de enfermería quirúrgica');
  el('p','Elige un tema para leer los conceptos y practicar de memoria. El simulacro mezcla preguntas de los cinco módulos.');
  const grid = el('div',''); grid.className = 'grid';
  modules.forEach(([name, , summary], i) => {
    const tile = button('', () => moduleView(i), grid, 'tile');
    el('strong',name,tile); el('small',summary,tile);
  });
  activityMenu();
  const due = items.filter(x => progress[x.id]?.due <= Date.now());
  button('Simulacro mixto · 10 preguntas', () => start(shuffled(modules.flatMap((_,i) => shuffled(items.filter(x=>x.group===i)).slice(0,2))), 'exam'), screenArea,'accent');
  if (due.length) button('Repasar pendientes (' + due.length + ')', () => start(shuffled(due),'cards'));
  el('p','Has practicado ' + items.filter(x=>progress[x.id]).length + ' de ' + items.length + ' conceptos. Los aciertos vuelven al repaso en 24 horas y los errores quedan pendientes desde ahora.');
}
function moduleView(i) {
  clear(); button('← Módulos',home);
  el('h2',modules[i][0]); el('p',modules[i][2]);
  const list = items.filter(x=>x.group===i);
  button('Practicar con fichas',()=>start(shuffled(list),'cards'),screenArea,'accent');
  button('Evaluarme en este tema',()=>start(shuffled(list),'exam'));
  for (const item of list) {
    const box = el('article',''); el('h3',item.answer,box); el('p',item.explanation,box); source(item,box);
  }
}
function start(list, mode) {
  deck = list; index = 0; kind = mode; missed = []; show();
}
function show() {
  clear(); button('← Módulos',home);
  const item = deck[index];
  meter(index, deck.length);
  el('p',(kind==='cards'?'Ficha ':'Pregunta ') + (index+1) + ' de ' + deck.length + ' · ' + item.topic);
  const box = el('article',''); el('h2',item.casePrompt || item.question,box);
  if (kind==='cases') {
    const hint = el('details','',box); el('summary','Consultar una pista',hint); el('p',item.hint,hint);
  }
  if (kind==='cards') {
    el('p','Responde de memoria antes de revelar la ficha.',box);
    const reveal = button('Ver respuesta',()=>{
      reveal.remove(); el('h3',item.answer,box); el('p',item.explanation,box); source(item,box);
      const row = el('div','',box);
      button('Lo recordé',()=>advance(true),row); button('Necesito repasarlo',()=>advance(false),row);
    },box,'accent');
  } else {
    const options = el('div','',box);
    for (const choice of shuffled(item.choices)) button(choice,()=>{
      options.replaceChildren();
      const correct = choice===item.answer;
      react(correct);
      el('strong',correct?'¡Correcto!':'Tu respuesta: '+choice,box);
      el('p','Respuesta correcta: '+item.answer+'. '+item.explanation,box).className='feedback';
      source(item,box);
      const row=el('div','',box); button(index+1===deck.length?'Ver resultado':'Siguiente',()=>advance(correct),row,'accent');
    },options,'choice');
  }
}
function advance(correct) {
  save(deck[index],correct); if (!correct) missed.push(deck[index]);
  if (++index<deck.length) return show();
  clear(); el('h2',kind==='cards'?'Repaso terminado':kind==='cases'?'Casos resueltos':'Resultado del simulacro');
  el('p',(deck.length-missed.length)+' de '+deck.length+(kind==='cards'?' conceptos recordados.':' respuestas correctas.'));
  if(missed.length) {
    el('h3','Conceptos para reforzar');
    for(const item of missed) el('p',item.topic+' · '+item.answer);
    button('Practicar estos errores',()=>start([...missed],'cards'),screenArea,'accent');
  }
  button('Volver a los módulos',home);
}
home();
