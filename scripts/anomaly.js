const AnomalyComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.anomalyEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "anomaly"
        ) {
          chronobot.water -= 2;
          let resourcesSpent = 0;

          for (let index = 0; index < 2; index++) {
            if (chronobot.titanium > 0) {
              resourcesSpent++;
              chronobot.titanium--;
              return;
            }
            if (chronobot.gold > 0) {
              resourcesSpent++;
              chronobot.gold--;
              return;
            }
            if (chronobot.uranium > 0) {
              resourcesSpent++;
              chronobot.uranium--;
              return;
            }

            if (index > 0 && resourcesSpent < 2 && chronobot.neutronium > 0) {
              chronobot.neutronium--;
            }
          }

          chronobot.anomalies.pop();
          modal.hide();
        }
      });
    }
  }

  bindEvents();

  function executeAction() {
    if (
      chronobot.anomalies.length > 0 &&
      chronobot.water >= 2 &&
      (chronobot.titanium + chronobot.gold + chronobot.uranium >= 2 ||
        chronobot.neutronium > 0)
    ) {
      return `<div>
    <h3>Remove Anomaly</h3>
      <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="anomaly">Remove Anomaly</button>
        </div>
        </div>`;
    }

    return `
    <div>
    <h3>Remove Anomaly</h3>
    </div>
      <div>
        <h3 class="text-danger">Action not possible.</h3>
      </div>
      <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>`;
  }

  return {
    executeAction
  };
};

export default AnomalyComponent;
