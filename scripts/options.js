const OptionsComponent = function(app) {
  function bindEvents() {
    document.addEventListener("click", function(e) {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "difficulty") {
          app.easyMode = targetElement.checked;
          app.updateState();
        } else if (action === "newGame") {
          window.location.reload();
        }
      }
    });
  }
  bindEvents();
};

export default OptionsComponent;
