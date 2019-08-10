const TimeTravelComponent = function(app, chronoBot, modal) {
  function bindEvents() {
    if (!app.timeTravelEventsBound) {
      document.addEventListener("click", function(e) {
        if (
          e.target &&
          e.target.dataset &&
          e.target.dataset.action &&
          e.target.dataset.action === "time"
        ) {
          chronoBot.properties.timeTravelTrack.currentSpace++;
          chronoBot.properties.timePoints =
            chronoBot.properties.timeTravelTrack.spaces[
              chronoBot.properties.timeTravelTrack.currentSpace
            ].vp;
          modal.hide();
          app.updateState();
          chronoBot.updateDisplay();
        }

        app.timeTravelEventsBound = true;
      });
    }
  }

  bindEvents();

  function executeAction(dieHtml) {
    let html = "";
    html += `
    <div>
        <h3>Time Travel ${dieHtml}</h3>
    </div>`;
    if (
      chronoBot.properties.timeTravelTrack.currentSpace <
      chronoBot.properties.timeTravelTrack.spaces.length
    ) {
      html += `
    <div>
        <ul class="list-unstyled">
            <li>
                <p class="badge-dark col rounded m-auto">Remove any one Warp tile from the past Timeline tile where Chronobot has the most Warp tiles (oldest if tied).</p>                
            </li>
        </ul>
    </div>    
        <div class="col-md-8 m-auto">
            <button class="btn btn-block btn-primary mb-2" data-action="time">Remove Warp Tile</button>
        </div>`;
    } else {
      html += `  
      <div>
        <h3 class="rounded badge-danger col-12">Action not possible.</h3>
      </div>
      <div class="col-md-8 m-auto">
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
