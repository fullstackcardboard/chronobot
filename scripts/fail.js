const ActionFailComponent = function(app, chronobot, modal) {
  function bindEvents() {
    if (!app.failEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset && e.target.dataset.action) {
          const action = e.target.dataset.action;
          if (action === "fail") {
            const vpOnly = e.target.dataset.vpOnly;
            if (!vpOnly) {
              chronobot.properties.water += 2;
            }
            if (!app.easyMode) {
              chronobot.properties.vp++;
            }
            modal.hide();
            chronobot.updateDisplay();
            app.updateState();
          }
        }

        app.failEventsBound = true;
      });
    }
  }

  bindEvents();
};

export default ActionFailComponent;
