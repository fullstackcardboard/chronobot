const RecruitComponent = function(appState, chronobot, modal) {
  function bindEvents() {
    if (!appState.recruitEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset && e.target.dataset.action) {
          const action = e.target.dataset.action;
          if (action === "recruit") {
            const recruitSelect = document.getElementById("recruitSelect");
            const selectedWorker = recruitSelect.value;
            chronobot[selectedWorker]++;
            modal.hide();

            if (
              chronobot.scientists > 0 &&
              chronobot.engineers > 0 &&
              chronobot.adminstrators > 0 &&
              chronobot.geniuses > 0
            ) {
              chronobot.scientists--;
              chronobot.engineers--;
              chronobot.adminstrators--;
              chronobot.geniuses--;
            }
          }
        }
      });

      appState.recruitEventsBound = true;
    }
  }

  function executeAction() {
    return `
    <div>
        <h3>Recruit</h3>
    </div>
    <div>
        <ul class="list-unstyled  col col">
            <li class="badge-dark col-12 mb-2">
                <p>Place a powered up exosuit in an available Recruit space with the following preferences:</p>
                <ul class="list-unstyled  col">
                    <li><p>Top Recruit Space > Middle Recruit Space > Bottom Recruit Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>
            <li class="badge-dark col-12 mb-2">
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
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="recruit">Recruit</button>
        </div>`;
  }

  return {
    executeAction
  };
};
export default RecruitComponent;
