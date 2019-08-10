const SupplyComponent = function(app, chronobot, recruitComponent, modal) {
  function bindEvents() {
    if (!app.supplyEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "morale"
        ) {
          modal.hide();
        }
      });
    }
  }

  function executeAction(dieHtml) {
    if (chronobot.properties.moralePoints < 8) {
    }
    const currentMorale =
      chronobot.properties.moraleTrack.spaces[
        chronobot.properties.moraleTrack.currentSpace
      ];
    if (chronobot.properties.water >= currentMorale.cost) {
      chronobot.properties.water -= currentMorale.cost;
      chronobot.properties.moraleTrack.currentSpace++;
      chronobot.properties.moralePoints =
        chronobot.properties.moraleTrack.spaces[
          chronobot.properties.moraleTrack.currentSpace
        ].vp;
      chronobot.updateDisplay();
      app.updateState();

      return `
    <div>
    <h3>Supply ${dieHtml}</h3>
    </div>
      <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="morale">Increase Morale</button>
        </div>`;
    } else {
      return recruitComponent.executeAction();
    }
  }

  return {
    executeAction
  };
};

export default SupplyComponent;
