const SupplyComponent = function(chronobot, recruitComponent) {
  function executeAction() {
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
      appState.updateState();
      return `<div><button class="btn btn-primary" data-toggle="modal" data-target="#modal">Increase Morale</button></div>`;
    } else {
      return recruitComponent.executeAction();
    }
  }

  return {
    executeAction
  };
};

export default SupplyComponent;
