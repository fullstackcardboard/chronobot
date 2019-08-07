const TimeTravelComponent = function(appState, chronoBot, modal) {
  

  function bindEvents() {
    if (!appState.timeTravelEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "time"
        ) {
          chronoBot.timeTravelTrack.currentSpace++;
          modal.hide();
        }

        appState.timeTravelEventsBound = true;
      });
    }
  }

  bindEvents();

  function executeAction() {
    let html = "";
    html += `
    <div>
        <h3>Time Travel</h3>
    </div>`;
    if (chronoBot.timeTravelTrack.currentSpace < chronoBot.timeTravelTrack.spaces.length) {
      html += `
    <div>
        <ul class="list-unstyled">
            <li>
                <p class="badge-dark col rounded m-auto">Remove any one Warp tile from the past Timeline tile where Chronobot has the most Warp tiles (oldest if tied).</p>                
            </li>
        </ul>
    </div>    
        <div class="col-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="time">Remove Warp Tile</button>
        </div>`;
    } else {
      html += `  
      <div>
        <h3 class="text-danger">Action not possible.</h3>
      </div>
      <div class="col-8 m-auto">
            <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
        </div>`;
    }

    return html;
  }

  return {
    executeAction
  };
};

export default TimeTravelComponent;
