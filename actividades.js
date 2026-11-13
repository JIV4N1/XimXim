const scenarios = [
  ['0-2','En clase comparan dos esquemas de anestesia regional. En uno, el anestésico está en contacto con el líquido cefalorraquídeo. ¿Qué espacio debes señalar?', 'Piensa dónde circula el líquido cefalorraquídeo.'],
  ['1-0','En una mesa de práctica hay dos hilos del mismo material, uno 3-0 y otro 5-0. ¿Qué diferencia esperas encontrar en el 5-0?', 'Cuenta los ceros y recuerda qué mide el calibre.'],
  ['2-1','En un diagrama monopolar, una flecha sale del lápiz y atraviesa el tejido. ¿Qué elemento falta para completar el recorrido de regreso al generador?', 'Busca el componente con una superficie amplia de contacto.'],
  ['3-2','En una grabación de laparoscopia se ven varios canales en la pared abdominal. ¿Qué función cumplen durante la intervención?', 'Distingue el canal de los instrumentos que pasan por él.'],
  ['4-1','Al ordenar una bandeja de simulación encuentras una aguja curva y necesitas identificar el instrumento diseñado para sostenerla. ¿Cuál eliges?', 'El nombre de este portagujas comparte una palabra con el de una tijera robusta.'],
  ["0-5", "En el registro de recuperación se lee «conversa y refiere menos dolor». ¿Qué efecto queda documentado?", "Distingue el nivel de alerta de la percepción dolorosa."],
  ["0-8", "Al comparar dos registros tras un bloqueo, buscas el dato que muestra que su efecto está desapareciendo. ¿Cuál eliges?", "Busca cambios en el territorio bloqueado."],
  ["1-6", "En el laboratorio observas un hilo trenzado bajo una lupa. ¿Qué puedes afirmar sin conocer su composición?", "Describe primero lo que ves en la hebra."],
  ["1-7", "En una ficha de polímeros se describe la ruptura progresiva de las cadenas por acción del agua. ¿Cómo se llama el proceso?", "Recuerda los dos mecanismos de degradación de las suturas absorbibles."],
  ["2-6", "En el dibujo de una pinza, la flecha entra al tejido por una rama y regresa por la otra. ¿Por qué no aparece una placa separada?", "Localiza los dos extremos del circuito en el dibujo."],
  ["2-7", "Debes etiquetar la unidad con pantalla, ajuste de potencia y conectores de accesorios. ¿Qué nombre corresponde?", "Distingue el equipo central de sus mandos."],
  ["3-5", "Un informe endoscópico dice que se envió tejido a patología. ¿Qué acción explica la presencia de esa muestra?", "Una fotografía registra la apariencia, pero el laboratorio recibió material físico."],
  ["3-8", "En la pizarra se han mezclado lesiones de varias articulaciones. ¿Qué asociación permite reconstruir el apartado de hombro?", "Recuerda qué articulación se estudia con el manguito rotador."],
  ["4-5", "Una pinza permanece cerrada después de soltar las anillas. ¿Qué pieza del esquema explica ese comportamiento?", "La articulación permite movimiento; busca el mecanismo que fija la posición."],
  ["4-8", "Un dispositivo retira líquido del campo mediante un tubo conectado a succión. ¿Qué principio explica ese movimiento?", "Piensa en la diferencia entre aspirar líquido y comprimir el punto de sangrado."]
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
  ['4-4','Tijera de Littauer','Retira puntos de sutura'],
  ["0-5", "Analgesia", "Disminución de la percepción dolorosa"],
  ["0-7", "Mantenimiento anestésico", "Sostiene el estado anestésico durante la cirugía"],
  ["0-10", "Plexo braquial", "Territorio de la extremidad superior"],
  ["1-5", "Fuerza de tensión del nudo", "Carga que rompe el hilo anudado"],
  ["1-7", "Hidrólisis", "Degradación del polímero por acción del agua"],
  ["1-9", "Seda quirúrgica", "Fibra natural clasificada como no absorbible"],
  ["2-0", "Generador electroquirúrgico", "Produce energía de alta frecuencia"],
  ["2-2", "Pinza bipolar", "Ambos polos en las puntas"],
  ["2-8", "LigaSure Impact", "Integra prensión, sellado y corte"],
  ["3-5", "Biopsia", "Obtención de tejido para análisis"],
  ["3-6", "Cistoscopia", "Exploración del interior de la vejiga"],
  ["3-10", "Monitor laparoscópico", "Muestra la imagen captada por la cámara"],
  ["4-5", "Cremallera", "Fija el instrumento en posición cerrada"],
  ["4-10", "Caja de traba", "Articulación entre las ramas"],
  ["4-8", "Aspirador", "Retira líquidos mediante presión negativa"]
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
    ['Detecta el error','Corrige diez afirmaciones de los apuntes y comprueba el razonamiento.', errorRound],
    ['Desafío por tema','Elige entre cinco materias y practica con el banco de 60 preguntas.', () => chooseTopic(items, 'Desafío por tema', 'exam')],
    ['Reconoce el instrumental','Observa la silueta e identifica la pieza quirúrgica.',() => instrumentRound()],
    ['Conecta las parejas','Relaciona cuatro piezas por ronda de un banco de 25 asociaciones.',matchRound],
    ['Resuelve un caso','Explora 15 situaciones con pistas, explicaciones y referencias.',() => {
      const cases = scenarios.map(([id,casePrompt,hint]) => ({...items.find(item=>item.id===id),casePrompt,hint}));
      chooseTopic(cases, 'Casos por tema', 'cases');
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
function chooseTopic(bank, title, mode) {
  clear();
  button('← Módulos', home);
  el('h2', title);
  const grid = el('div', '');
  grid.className = 'practice-grid';
  modules.forEach(([name], group) => {
    const questions = bank.filter(item => item.group === group);
    button(name + ' · ' + questions.length, () => start(shuffled(questions), mode), grid, 'activity-tile');
  });
  button('Mezclar todos los temas · 10 preguntas', () => {
    const mixed = modules.flatMap((_, group) => shuffled(bank.filter(item => item.group === group)).slice(0, 2));
    start(shuffled(mixed), mode);
  }, screenArea, 'accent');
}

function errorRound() {
  const mistakes = [
    ['0-5','«Para sentir menos dolor es indispensable perder la conciencia». ¿Qué efecto puede darse con la persona alerta?'],
    ['0-2','«La anestesia espinal se administra en el espacio epidural». ¿Cuál es el espacio correcto?'],
    ['1-0','«Un hilo 5-0 tiene más diámetro que uno 3-0». ¿Qué caracteriza en realidad al 5-0?'],
    ['1-7','«Las suturas sintéticas absorbibles se degradan principalmente por digestión enzimática». ¿Qué mecanismo corresponde?'],
    ['2-1','«En monopolar, el pedal recoge la corriente que atravesó el tejido». ¿Qué pieza realiza esa función?'],
    ['2-2','«En una pinza bipolar uno de los polos queda en una placa separada». ¿Dónde se encuentran ambos polos?'],
    ['3-1','«La artroscopia permite ver el interior del colon». ¿Qué región se examina realmente?'],
    ['3-10','«El puerto laparoscópico muestra la imagen al equipo». ¿Qué componente la muestra?'],
    ['4-5','«La caja de traba mantiene la pinza asegurada en posición cerrada». ¿Cuál es el mecanismo correcto?'],
    ['4-1','«El separador de Deaver está diseñado para sostener agujas». ¿Qué instrumento cumple esa función?']
  ];
  const round = mistakes.map(([id, casePrompt]) => ({
    ...items.find(item => item.id === id),
    casePrompt
  }));
  start(shuffled(round), 'errors');
}
