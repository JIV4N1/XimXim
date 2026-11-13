// The highlighted SVG group is the feature discussed after each answer.
const visualInstruments = [
  {
    name: 'Tijera Littauer', page: 11,
    clue: 'Dos anillos y dos hojas abiertas. Una de las hojas termina en un pequeño gancho.',
    detail: 'La escotadura en forma de gancho distingue esta tijera quitapuntos.',
    body: '<ellipse cx="47" cy="54" rx="22" ry="14"/><ellipse cx="47" cy="119" rx="22" ry="14"/><path d="M67 58 170 86 271 120 174 93 66 65Z M67 110 167 84 174 89 67 117Z"/>',
    feature: '<path d="M165 85 261 53 Q270 50 273 56 L263 61 Q256 55 252 64 L174 93Z"/>'
  },
  {
    name: 'Portagujas Mayo-Hegar', page: 22,
    clue: 'Dos anillos, ramas largas, cierre dentado cerca de los anillos y mordazas cortas y robustas.',
    detail: 'Las mordazas cortas sujetan la aguja. La cremallera cerca de los anillos mantiene el cierre.',
    body: '<ellipse cx="44" cy="61" rx="22" ry="15"/><ellipse cx="44" cy="112" rx="22" ry="15"/><path d="M65 61 212 80 224 88 206 90 65 69Z M65 104 208 83 222 90 209 96 65 112Z"/>',
    feature: '<path d="M214 81 265 72 Q277 72 272 78 L222 90Z M221 89 272 93 Q277 99 267 100 L214 96Z M78 68 89 72 92 83 87 82 86 85 81 83Z M80 103 87 86 92 88 94 85 98 87 90 102Z"/>'
  },
  {
    name: 'Separador de Deaver', page: 19,
    clue: 'Una lámina ancha y lisa se curva como una J y continúa en un mango sin anillos.',
    detail: 'La pala ancha y curva permite mantener los tejidos apartados y exponer el campo.',
    body: '<path d="M39 47 Q29 45 29 53 L29 63 Q30 70 41 69 L157 70 171 56Z"/><path d="M44 54 139 58" fill="none"/>',
    feature: '<path d="M153 55 231 57 Q270 59 271 91 Q272 127 230 143 L211 130 Q251 113 248 91 Q247 77 227 77 L150 70Z"/>'
  },
  {
    name: 'Bisturí', page: 7,
    clue: 'Un mango plano con estrías termina en una hoja estrecha con un solo borde cortante.',
    detail: 'La hoja con filo, unida al extremo del mango, identifica al instrumento de incisión.',
    body: '<path d="M29 79 Q23 78 21 87 Q22 96 32 97 L168 96 191 89 215 89 215 80 185 80 166 75Z"/><path d="m56 81 -5 10 m15 -10 -5 10 m15 -10 -5 10 m15 -10 -5 10 m15 -10 -5 10 m15 -10 -5 10" fill="none"/>',
    feature: '<path d="M198 78 269 65 290 61 Q270 91 245 95 L215 94Z"/><path d="m207 82 28 -5" fill="none"/>'
  }
];

function instrumentRound(pool = visualInstruments) {
  const round = shuffled(pool);
  const errors = [];
  let position = 0;
  function display() {
    clear();
    button('← Módulos', home);
    el('h2', 'Reconoce el instrumental');
    meter(position, round.length);
    const item = round[position];
    const box = el('article', '');
    el('p', 'Pieza ' + (position + 1) + ' de ' + round.length, box);
    const drawing = el('div', '', box);
    drawing.className = 'instrument-drawing';
    drawing.innerHTML = '<svg role="img" viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg"><g stroke-linejoin="round" stroke-linecap="round">' + item.body + '<g class="instrument-feature">' + item.feature + '</g></g></svg>';
    drawing.firstElementChild.setAttribute('aria-label', item.clue);
    const question = el('h3', '¿Qué instrumento ves?', box);
    question.tabIndex = -1;
    question.focus();
    const options = el('div', '', box);
    const alternatives = shuffled(visualInstruments.filter(other => other !== item)).slice(0, 2);
    for (const choice of shuffled([item, ...alternatives])) {
      button(choice.name, () => {
        options.remove();
        const correct = choice === item;
        if (!correct) errors.push(item);
        react(correct);
        drawing.classList.add('identified');
        question.textContent = correct ? '¡Correcto! ' + item.name : 'Elegiste ' + choice.name + '. La respuesta correcta es ' + item.name + '.';
        question.focus();
        el('p', item.detail, box);
        el('small', 'Instrumental.pptx · Diapositiva ' + item.page, box);
        const row = el('div', '', box);
        button(position + 1 === round.length ? 'Ver resultado' : 'Siguiente pieza', () => {
          position++;
          if (position < round.length) display();
          else finish();
        }, row, 'accent');
      }, options, 'choice');
    }
  }
  function finish() {
    clear();
    el('h2','Ronda de instrumental terminada');
    meter(round.length, round.length);
    el('p','Identificaste ' + (round.length - errors.length) + ' de ' + round.length + ' piezas.');
    if (errors.length) button('Reintentar las piezas pendientes', () => instrumentRound(errors));
    button('Nueva ronda', () => instrumentRound(), screenArea, 'accent');
    button('Volver a los módulos', home);
  }
  display();
}
