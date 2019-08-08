const MineComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.mineEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset && e.target.dataset.action) {
          const action = e.target.dataset.action;
          if (action === "mine") {
            Array.from(document.querySelectorAll("[data-resources]")).map(
              function(element) {
                chronobot.properties[element.value.toLowerCase()]++;
              }
            );
            modal.hide();
            if (
              chronobot.properties.neutronium > 0 &&
              chronobot.properties.gold > 0 &&
              chronobot.properties.uranium > 0 &&
              chronobot.properties.titanium > 0
            ) {
              chronobot.properties.neutronium--;
              chronobot.properties.gold--;
              chronobot.properties.uranium--;
              chronobot.properties.titanium--;
              chronobot.properties.vp += 5;
            }
            chronobot.updateDisplay();
            appState.updateState();
          }
        }

        appState.mineEventsBound = true;
      });
    }
  }

  function executeAction() {
    return `
    <div>
        <h3>Mine - CURRENT RESOURCES WILL DISPLAY HERE</h3>
    </div>
    <div>
        <ul class="list-unstyled  col col">
            <li class="badge-dark col-12 mb-2">
                <p>Place a powered up exosuit in an available Mine space with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Top Mine Space > Bottom Mine Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 mb-2">
                <p>Take resources that Chronobot does not yet have; with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Neutronium > Uranium > Gold > Titanium</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 mb-2">
                <p>If not available, or tied, take resources with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Neutronium > Uranium > Gold > Titanium</p></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="row mb-2">
        <div class="col-6">
          <label>Resource One</label>
            <select data-resources="" class="form-control">
                <option>Neutronium</option>
                <option>Uranium</option>
                <option>Gold</option>
                <option>Titanium</option>
            </select>
        </div>
        <div class="col-6">
          <label>Resource Two</label>
            <select data-resources="" class="form-control mb-2">
                <option>Neutronium</option>
                <option>Uranium</option>
                <option>Gold</option>
                <option>Titanium</option>
            </select>
        </div>
    </div>
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="mine">Mine</button>
        </div>`;
  }

  bindEvents();

  return {
    executeAction
  };
};

export default MineComponent;
