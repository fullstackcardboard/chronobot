const RecruitComponent = function(app, chronobot, modal) {
  function bindEvents() {
    if (!app.recruitEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset && e.target.dataset.action) {
          const action = e.target.dataset.action;
          if (action === "recruit") {
            const recruitSelect = document.getElementById("recruitSelect");
            let selectedWorker = recruitSelect.value.toLowerCase();
            selectedWorker =
              selectedWorker === "genius" ? "geniuses" : selectedWorker + "s";
            chronobot.properties[selectedWorker]++;
            modal.hide();
            if (chronobot.workersScoreable) {
              chronobot.properties.scientists--;
              chronobot.properties.engineers--;
              chronobot.properties.administrators--;
              chronobot.properties.geniuses--;
              chronobot.properties.vp += 5;
            }
            chronobot.updateDisplay();
            app.updateState();
          }
        }
      });

      app.recruitEventsBound = true;
    }
  }

  function executeAction(dieHtml) {
    return `
    <div>
        <h3>Recruit ${dieHtml}</h3>
    </div>
      <h4>Workers</h4>
          <div class="row">
            <div class="col">
                <p>Sc: ${chronobot.properties.scientists}</p>
            </div>
            <div class="col">
                <p>En: ${chronobot.properties.engineers}</p>
            </div>
            <div class="col">
                <p>Admin: ${chronobot.properties.administrators}</p>
            </div>
            <div class="col">
                <p>Gen: ${chronobot.properties.geniuses}</p>
            </div>
          </div>
        </div>
    <div>
        <ul class="list-unstyled  col col">
            <li class="badge-dark col-12 rounded mb-2">
                <p>Place a powered up exosuit in an available Recruit space with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Top Recruit Space > Middle Recruit Space > Bottom Recruit Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 rounded mb-2">
                <p>Take a worker that Chronobot does not yet have; with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Genius > Administrator > Engineer > Scientist</p></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="row mb-2">
        <div class="col-6 m-auto">
            <select id="recruitSelect" class="form-control ml-1">
                <option>Scientist</option>
                <option>Engineer</option>
                <option>Administrator</option>
                <option>Genius</option>
            </select>
        </div>
        </div>
    </div>
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="recruit">Recruit</button>
        </div>`;
  }

  bindEvents();
  return {
    executeAction
  };
};
export default RecruitComponent;
