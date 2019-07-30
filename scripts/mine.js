const MineComponent = function(appState, chronobot) {
  function bindEvents() {
    if (
      !appState.mineEventsBound &&
      e.target &&
      e.target.dataset &&
      e.target.dataset.action
    ) {
      const action = e.target.dataset.action;
      if (action === "mine") {
        document.querySelectorAll("[data-resources]").map(function(element) {
          chronobot[element.value]++;
        });
      }
    }

    appState.mineEventsBound = true;
  }

  function executeAction() {
    return `
    <div>
        <h3>Mine</h3>
    </div>
    <div>
        <ul class="list-unstyled">
            <li class="badge badge-dark col-12 mb-2">
                <p>Place a powered up exosuit in an available Mine space with the following preferences:</p>
                <ul class="list-unstyled">
                    <li><p>Top Mine Space > Bottom Mine Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>
            <li class="badge badge-dark col-12 mb-2">
                <p>Take resources that Chronobot does not yet have; with the following preferences:</p>
                <ul class="list-unstyled">
                    <li><p>Neutronium > Uranium > Gold > Titanium</p></li>
                </ul>
            </li>
            <li class="badge badge-dark col-12 mb-2">
                <p>If not available, or tied, take resources with the following preferences:</p>
                <ul class="list-unstyled">
                    <li><p>Neutronium > Uranium > Gold > Titanium</p></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="row mb-2">
        <div class="col-6">
            <select data-action="resources" class="form-control ml-1">
                <option>Select 1st Resource</option>
                <option>Neutronium</option>
                <option>Uranium</option>
                <option>Gold</option>
                <option>Titanium</option>
            </select>
        </div>
        <div class="col-6">
            <select data-action="resources" class="form-control ml-1">
                <option>Select 2nd Resource</option>
                <option>Neutronium</option>
                <option>Uranium</option>
                <option>Gold</option>
                <option>Titanium</option>
            </select>
        </div>
    </div>
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger" data-action="fail">Action Failed</button>
        </div>
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary" data-action="mine">Mine</button>
        </div>`;
  }

  bindEvents();

  return {
    executeAction
  };
};
