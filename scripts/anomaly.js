const AnomalyComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.anomalyEventsBound) {
      document.addEventListener("click", function(e) {
        handleAnomalyRemoval(e);
        handleAnomalyAddition(e);
        appState.anomalyEventsBound = true;
      });

      function handleAnomalyRemoval(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "anomaly"
        ) {
          chronobot.properties.water -= 2;
          let resourcesSpent = 0;

          for (let index = 0; index < 2; index++) {
            if (chronobot.properties.titanium > 0) {
              resourcesSpent++;
              chronobot.properties.titanium--;
              return;
            }
            if (chronobot.properties.gold > 0) {
              resourcesSpent++;
              chronobot.gold--;
              return;
            }
            if (chronobot.properties.uranium > 0) {
              resourcesSpent++;
              chronobot.properties.uranium--;
              return;
            }

            if (
              index > 0 &&
              resourcesSpent < 2 &&
              chronobot.properties.neutronium > 0
            ) {
              chronobot.properties.neutronium--;
            }
          }
          chronobot.properties.anomalies--;
          modal.hide();
          appState.updateState();
        }
      }
      function handleAnomalyAddition(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "addAnomaly"
        ) {
          chronobot.properties.anomalies++;
          chronobot.updateDisplay();
          appState.updateState();
        }
      }
    }
  }

  bindEvents();

  function executeAction() {
    if (
      chronobot.properties.anomalies > 0 &&
      chronobot.properties.water >= 2 &&
      (chronobot.properties.titanium +
        chronobot.properties.gold +
        chronobot.properties.uranium >=
        2 ||
        chronobot.properties.neutronium > 0)
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
