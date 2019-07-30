const SupplyComponent = function(appState, chronobot, recruitComponent) {
  function executeAction() {
    const currentMorale =
      chronobot.moraleTrack.spaces[chronobot.moraleTrack.currentSpace];
    if (chronobot.water >= currentMorale.cost) {
      chronobot.water -= currentMorale.cost;
      return `<div>Morale increased</div>`;
    } else {
      return recruitComponent.executeAction();
    }
  }

  return {
    executeAction
  };
};

export default SupplyComponent;