const WaterComponent = function(app, chronobot, modal) {
  function bindEvents() {
    if (!app.waterEventsBound) {
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
          app.updateState();
        }
      });

      app.waterEventsBound = true;
    }
  }
  bindEvents();

  function executeAction(dieHtml) {
    return `
    <div>
    <h3>Water ${dieHtml}</h3>
    </div>
      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="water">Gain Water</button>
        </div>`;
  }

  return {
    executeAction
  };
};

export default WaterComponent;
