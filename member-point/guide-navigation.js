(() => {
  const guide = document.querySelector('#guide');
  const nav = guide?.querySelector('.redemption-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a')];
  const steps = links.map(a => document.querySelector(a.hash));
  let pending = false;
  function measure() {
    const mainHeight = document.querySelector('.nav').getBoundingClientRect().height;
    guide.style.setProperty('--main-nav-height', mainHeight + 'px');
    guide.style.setProperty('--guide-nav-height', nav.getBoundingClientRect().height + 'px');
  }
  function update() {
    pending = false;
    const line = document.querySelector('.nav').getBoundingClientRect().height + nav.getBoundingClientRect().height + 70;
    let active = 0;
    steps.forEach((step, i) => { if (step.getBoundingClientRect().top <= line) active = i; });
    links.forEach((link, i) => {
      const current = i === active;
      if (current) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });

  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', () => { measure(); schedule(); });
  new ResizeObserver(() => { measure(); schedule(); }).observe(document.querySelector('.nav'));
  measure(); update();
})();


