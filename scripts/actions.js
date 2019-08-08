const ActionsDisplayComponent = function() {
  function updateDisplays(actions) {
    updateAllDisplay(actions);
    updatePossibleDisplay(actions);
  }

  function updateAllDisplay(actions) {
    const allActionsContainer = document.getElementById("allActions");
    let html = ``;

    const keys = Object.keys(actions);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let triggerNumbers = "";
      let nextTriggerNumbers = "";
      const action = actions[key];
      if (actions[key].triggers.length > 0) {
        triggerNumbers += "(";
        for (let index = 0; index < actions[key].triggers.length; index++) {
          const number = actions[key].triggers[index];
          triggerNumbers += number;
          if (
            actions[key].triggers.length > 1 &&
            index != actions[key].triggers.length - 1
          ) {
            triggerNumbers += ",";
          }
        }
        triggerNumbers += ")";
      }

      if (actions[action.nextAction].triggers.length > 0) {
        nextTriggerNumbers += "(";
        const nextAction = actions[action.nextAction];
        for (let index = 0; index < nextAction.triggers.length; index++) {
          const triggerNumber = nextAction.triggers[index];
          nextTriggerNumbers += triggerNumber;
          if (
            actions[action.nextAction].triggers.length > 1 &&
            index != actions[action.nextAction].triggers.length - 1
          ) {
            nextTriggerNumbers += ",";
          }
        }
        nextTriggerNumbers += ")";
      }
      html += `<div
            class="col border shadow rounded bg-dark text-white action text-center mb-2"
            data-action="${key}"
          >
            ${key.toUpperCase()}
            ${triggerNumbers} -> ${action.nextAction.toUpperCase()} ${nextTriggerNumbers}
          </div>`;
    }

    allActionsContainer.innerHTML = html;
  }

  function updatePossibleDisplay(actions) {
    const possibleActionsContainer = document.getElementById("possibleActions");
    let html = ``;

    const keys = Object.keys(actions);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let triggerNumbers = "";
      let nextTriggerNumbers = "";
      if (actions[key].triggers.length > 0) {
        const action = actions[key];
        triggerNumbers += "(";
        for (let index = 0; index < actions[key].triggers.length; index++) {
          const number = actions[key].triggers[index];
          triggerNumbers += number;
          if (
            actions[key].triggers.length > 1 &&
            index != actions[key].triggers.length - 1
          ) {
            triggerNumbers += ",";
          }
        }
        triggerNumbers += ")";

        if (actions[action.nextAction].triggers.length > 0) {
          nextTriggerNumbers += "(";
          const nextAction = actions[action.nextAction];
          for (let index = 0; index < nextAction.triggers.length; index++) {
            const triggerNumber = nextAction.triggers[index];
            nextTriggerNumbers += triggerNumber;
            if (
              actions[action.nextAction].triggers.length > 1 &&
              index != actions[action.nextAction].triggers.length - 1
            ) {
              nextTriggerNumbers += ",";
            }
          }
          nextTriggerNumbers += ")";
        }
        html += `<div
            class="col mb-2 border shadow rounded bg-dark text-white action text-center"
            data-action="${key}"
          >
            ${key.toUpperCase()}
            ${triggerNumbers} -> ${action.nextAction.toUpperCase()} ${nextTriggerNumbers}
          </div>`;
      }
    }

    possibleActionsContainer.innerHTML = html;
  }

  return {
    updateDisplays
  };
};

export default ActionsDisplayComponent;
