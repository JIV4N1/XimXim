// Use the visitor's local clock. Manual previews last until they select Auto.
function sceneForHour(hour) {
  return hour >= 6 && hour < 12 ? 'morning' : hour >= 12 && hour < 19 ? 'afternoon' : 'night';
}
(() => {
  const find = selector => document.querySelector(selector);
  const button = find('#night');
  const title = find('h1');
  const greeting = title.firstChild;
  const intro = find('.intro');
  const subcopy = find('.subcopy');
  const wish = find('#wish').firstChild;
  const closing = find('.closing p');
  const letterTitle = find('#letter h2');
  const original = { greeting: greeting.textContent, intro: intro.innerHTML,
    subcopy: subcopy.innerHTML, wish: wish.textContent, closing: closing.innerHTML,
    letterTitle: letterTitle.innerHTML, title: document.title };
  const scenes = {
    morning: { label: 'Mañana', icon: '☀', color: '#fff9e8', greeting: 'Buenos días,',
      intro: 'Que hoy encuentres motivos para sonreír y un poquito de magia en lo cotidiano.',
      subcopy: 'Pompompurin ya despertó.<br>Un nuevo día para compartir contigo.',
      wish: 'Un millón de besos para empezar el día ',
      closing: 'Hoy te esperan cosas bonitas.<br><strong>Te quiero</strong>',
      letterTitle: 'Que tengas un día bonito,<br>Ximena.',
      description: 'Pompompurin sobre una nube, con un sol brillante y flores de la mañana' },
    afternoon: { label: 'Tarde', icon: '☀', color: '#fff0e2', greeting: 'Buenas tardes,',
      intro: 'Entre tantas cosas por hacer, aquí tienes un ratito bonito solo para ti.',
      subcopy: 'Pompompurin te acompaña esta tarde.<br>Haz una pausa, respira y sonríe.',
      wish: 'Un millón de besos para tu tarde ',
      closing: 'Una pausa bonita para seguir con tu día.<br><strong>Te quiero</strong>',
      letterTitle: 'Disfruta tu tarde,<br>Ximena.',
      description: 'Pompompurin sobre nubes cálidas, bajo el sol dorado de la tarde' },
    night: { label: 'Noche', icon: '☾', color: '#292b39', ...original,
      description: 'Pompompurin descansando sobre una nube, rodeado de estrellas y una luna creciente' }
  };
  const flowers = document.createElement('div');
  flowers.className = 'scene-flowers';
  flowers.setAttribute('aria-hidden', 'true');
  flowers.innerHTML = '<span>✿</span><span>✿</span><span>✿</span>';
  find('.art').append(flowers);
  const status = document.createElement('p');
  status.className = 'scene-status';
  status.setAttribute('aria-live', 'polite');
  find('header').after(status);
  button.removeAttribute('aria-pressed');
  let mode = 'auto';
  let lastKey = '';
  function updateScene() {
    const current = mode === 'auto' ? sceneForHour(new Date().getHours()) : mode;
    const key = mode + current;
    if (key === lastKey) return;
    lastKey = key;
    const scene = scenes[current];
    document.body.dataset.scene = current;
    document.body.classList.toggle('night', current === 'night');
    greeting.textContent = scene.greeting;
    intro.innerHTML = scene.intro;
    subcopy.innerHTML = scene.subcopy;
    wish.textContent = scene.wish;
    closing.innerHTML = scene.closing;
    letterTitle.innerHTML = scene.letterTitle;
    find('.letter-star').textContent = scene.icon;
    find('.brand-icon').textContent = scene.icon;
    find('.art').setAttribute('aria-label', scene.description);
    find('meta[name="theme-color"]').setAttribute('content', scene.color);
    document.title = current === 'night' ? original.title : `${scene.greeting} Ximena · Pompompurin`;
    const next = { auto: 'morning', morning: 'afternoon', afternoon: 'night', night: 'auto' }[mode];
    button.textContent = `${scene.icon} ${mode === 'auto' ? 'Auto' : scene.label}`;
    button.setAttribute('aria-label', `Escena ${scene.label.toLowerCase()}${mode === 'auto' ? ' automática' : ' manual'}. Cambiar a ${next === 'auto' ? 'modo automático' : scenes[next].label.toLowerCase()}`);
    status.textContent = mode === 'auto' ? `${scene.label} · según tu hora local` : `${scene.label} · vista manual`;
  }
  button.addEventListener('click', () => {
    mode = { auto: 'morning', morning: 'afternoon', afternoon: 'night', night: 'auto' }[mode];
    updateScene();
  });
  updateScene();
  setInterval(updateScene, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateScene(); });
})();
