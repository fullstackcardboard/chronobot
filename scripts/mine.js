const MineComponent = function(app, chronobot, modal) {
  function bindEvents() {
    if (!app.mineEventsBound) {
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
            if (chronobot.resourcesScoreable) {
              chronobot.properties.neutronium--;
              chronobot.properties.gold--;
              chronobot.properties.uranium--;
              chronobot.properties.titanium--;
              chronobot.properties.vp += 5;
            }
            chronobot.updateDisplay();
            app.updateState();
          }
        }

        app.mineEventsBound = true;
      });
    }
  }

  function executeAction(dieHtml) {
    return `
    <div>
        <h3>Mine ${dieHtml}</h3>
    </div
    <div class="col">
          <h4>Resources</h4>
        <div class="row">
            <div class="col">
                <p>Ne: ${chronobot.properties.neutronium}</p>
            </div>
            <div class="col">
                <p>Ur: ${chronobot.properties.uranium}</p>
            </div>
            <div class="col">
                <p>Gold: ${chronobot.properties.gold}</p>
            </div>
            <div class="col">
                <p>Ti: ${chronobot.properties.titanium}</p>
            </div>
          </div>
        </div>
    <div>
        <ul class="list-unstyled  col">
            <li class="badge-dark col-12 mb-2 rounded">
                <p>Place a powered up exosuit in an available Mine space with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Top Mine Space > Bottom Mine Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 mb-2 rounded">
                <p>Take resources that Chronobot does not yet have; with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Neutronium > Uranium > Gold > Titanium</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 mb-2 rounded">
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
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="mine">Mine</button>
        </div>`;
  }

  bindEvents();

  return {
    executeAction
  };
};

export default MineComponent;
