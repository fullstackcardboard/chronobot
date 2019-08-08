const WaterComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.waterEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e &&
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "water"
        ) {
          chronobot.properties.water += 2;
          chronobot.updateDisplay();
          modal.hide();
          appState.updateState();
        }
      });

      appState.waterEventsBound = true;
    }
  }
  bindEvents();

  function executeAction() {
    return `
    <div>
    <h3>Water</h3>
    </div>
      <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="water">Gain Water</button>
        </div>`;
  }

  return {
    executeAction
  };
};

export default WaterComponent;
