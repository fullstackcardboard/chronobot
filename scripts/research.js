const ResearchComponent = function(app, chronobot, modal) {
  const breakthroughs = ["circle", "triangle", "square"];
  let breakthroughIndex = 0;
  function bindEvents() {
    if (!app.researchEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "breakthrough"
        ) {
          chronobot.properties.vp++;
          const breakthrough = breakthroughs[breakthroughIndex];
          chronobot.properties.breakthroughs[breakthrough]++;

          while (chronobot.breakthroughsScoreable) {
            chronobot.properties.breakthroughs.circle--;
            chronobot.properties.breakthroughs.square--;
            chronobot.properties.breakthroughs.triangle--;
            chronobot.properties.vp += 2;
          }
          chronobot.updateDisplay();
          modal.hide();
          app.updateState();
        }
      });
    }
  }
  bindEvents();

  function executeAction(dieHtml) {
    breakthroughIndex = Math.floor(Math.random() * breakthroughs.length);
    const breakthrough = breakthroughs[breakthroughIndex];

    chronobot.updateDisplay();
    return `<div>
    <h3>Research ${dieHtml}</h3>
      <div class="col-md-8 m-auto">
        <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
      </div>
      <div class="col m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="breakthrough">Gain ${breakthrough.toUpperCase()} breakthrough.</button>
        </div>
        </div>`;
  }

  return { executeAction };
};

export default ResearchComponent;
