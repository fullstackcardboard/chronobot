const ResearchComponent = function(appState, chronobot, modal) {
  const breakthroughs = ["circle", "triangle", "square"];

  function bindEvents() {
    if (!appState.researchEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "breakthrough"
        ) {
          modal.hide();
          appState.updateState();
        }
      });
    }
  }
  bindEvents();

  function executeAction() {
    const breakthroughIndex = Math.floor(Math.random() * breakthroughs.length);
    chronobot.properties.vp++;
    const breakthrough = breakthroughs[breakthroughIndex];
    chronobot.properties.breakthroughs[breakthrough]++;
    
    const scoredBreakthroughs = chronobot.breakthroughsScoreable
      ? `<p class="rounded badge-dark col-12">Scored breakthrough set(s).</p>`
      : "";
    while (chronobot.breakthroughsScoreable) {
      chronobot.properties.breakthroughs.circle--;
      chronobot.properties.breakthroughs.square--;
      chronobot.properties.breakthroughs.triangle--;
      chronobot.vp += 2;
    }
    chronobot.updateDisplay();
    return `<div>
    <h3>Research</h3>
    <p class="rounded badge-dark col-12">Gained ${breakthrough} breakthrough.<p>
    ${scoredBreakthroughs}    
      <div class="col m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="breakthrough">Done</button>
        </div>
        </div>`;
  }

  return { executeAction };
};

export default ResearchComponent;
