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
    chronobot.properties.breakthroughs[breakthroughIndex]++;
    chronobot.updateDisplay();
    return `<div>
    <h3>Research</h3>
      <div class="col m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="breakthrough">Gain ${breakthrough} Breakthrough</button>
        </div>
        </div>`;
  }

  return { executeAction };
};

export default ResearchComponent;
