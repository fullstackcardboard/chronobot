const SupplyComponent = function(chronobot, recruitComponent) {
  function executeAction() {
    const currentMorale =
      chronobot.moraleTrack.spaces[chronobot.moraleTrack.currentSpace];
    if (chronobot.water >= currentMorale.cost) {
      chronobot.water -= currentMorale.cost;
      chronobot.moraleTrack.currentSpace++;
      chronobot.updateDisplay();
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
