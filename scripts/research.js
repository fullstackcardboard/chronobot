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
        }
      });
    }
  }
  bindEvents();

  function executeAction() {
    const breakthroughIndex = Math.floor(Math.random() * breakthroughs.length);
    chronobot.vp++;
    const breakthrough = breakthroughs[breakthroughIndex];
    chronobot.breakthroughs[breakthroughIndex]++;
    chronobot.updateDisplay();
    modal.hide();
    return `<div>
    <h3>Research</h3>
      <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="breakthrough">Gain ${breakthrough} Breakthrough</button>
        </div>
        </div>`;
  }

  return { executeAction };
};

export default ResearchComponent;
