const ActionFailComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.failEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset && e.target.dataset.action) {
          const action = e.target.dataset.action;
          if (action === "fail") {
            chronobot.water += 2;
            chronobot.vp++;
            modal.hide();
            chronobot.updateDisplay();
          }
        }

        appState.failEventsBound = true;
      });
    }
  }

  bindEvents();
};

export default ActionFailComponent;
